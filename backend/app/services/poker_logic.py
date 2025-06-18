from pokerkit import Automation, NoLimitTexasHoldem


def _compress_actions(actions: list[dict]) -> str:
    out, current_round = [], None
    tok = {
        "fold": lambda a: "f",
        "check": lambda a: "x",
        "call": lambda a: "c",
        "bet": lambda a: f"b{a['amount']}",
        "raise": lambda a: f"r{a['amount']}",
        "allin": lambda a: "allin",
        "deal_flop": lambda a: "".join(a["cards"]),
        "deal_turn": lambda a: "".join(a["cards"]),
        "deal_river": lambda a: "".join(a["cards"]),
    }
    for act in actions:
        rnd = act.get("round")
        sym = tok[act["action"]](act)
        if rnd and rnd != current_round:  # new betting round
            if current_round is not None:
                out.append(" ")
            current_round = rnd
        if out and out[-1] != " ":
            out.append(":")
        out.append(sym)
    return "".join(out)


# ─── main evaluator ───────────────────────────────────────────────────────
def evaluate_hand(to_send: dict) -> tuple[str, str, str, str, str]:
    actions = to_send["actions"]
    stack_value = to_send["stackForAll"]
    hole_cards = to_send["holeCards"]
    num_players = len(hole_cards)

    # --- Create PokerKit state (all positional args) ----------------------
    automations = (
        Automation.ANTE_POSTING,
        Automation.BLIND_OR_STRADDLE_POSTING,
        Automation.BET_COLLECTION,
        Automation.HOLE_CARDS_SHOWING_OR_MUCKING,
        Automation.HAND_KILLING,
        Automation.CHIPS_PUSHING,
        Automation.CHIPS_PULLING,
    )
    state = NoLimitTexasHoldem.create_state(
        automations,  # automations tuple
        False,  # uniform_antes?  (False → individual antes list not used)
        0,  # ante size
        (20, 40),  # (SMALL_BLIND, BIG_BLIND)
        40,  # minimum bet = big blind
        (stack_value,) * num_players,
        num_players,
    )

    # --- Deal hole cards --------------------------------------------------
    for hc in hole_cards:
        state.deal_hole(hc)

    # --- Replay actions ---------------------------------------------------
    for act in actions:
        k = act["action"]
        if k == "fold":
            state.fold()
        elif k in ("check", "call"):
            state.check_or_call()
        elif k in ("bet", "raise", "allin"):
            state.complete_bet_or_raise_to(act["amount"])
        elif k.startswith("deal_"):
            try:
                state.burn_card()
            except ValueError:
                pass
            state.deal_board("".join(act["cards"]))

    stack_str = ", ".join(f"Player {i+1}: {stack_value}" for i in range(num_players))
    hands_str = ", ".join(f"Player {i+1}: {card}" for i, card in enumerate(hole_cards))
    actions_str = _compress_actions(actions)
    winnings_str = ", ".join(
        f"Player {i+1}: {net}" for i, net in enumerate(state.payoffs)
    )

    first_actor = actions[0]["playerIndex"]
    bb = (first_actor - 1) % 6
    sb = (bb - 1) % 6
    dealer = (sb - 1) % 6

    pos_str = f"Dealer: Player{dealer+1}, SB: Player{sb+1}, BB: Player{bb+1}"

    return stack_str, hands_str, actions_str, winnings_str, pos_str


# to_send = {
#        "actions": [
#       {"action": "fold",  "player_index": 5},
#       {"action": "fold",  "player_index": 0},
#       {"action": "fold",  "player_index": 1},
#       {"action": "raise", "player_index": 2, "amount": 300},
#       {"action": "call",  "player_index": 3, "amount": 280},
#       {"action": "fold",  "player_index": 4},

#       {"action": "deal_flop",  "player_index": -1, "round": "flop",  "cards": ["3h", "Kd", "Qs"]},
#       {"action": "check",      "player_index": 3},
#       {"action": "bet",        "player_index": 2, "amount": 100},
#       {"action": "call",       "player_index": 3, "amount": 100},

#       {"action": "deal_turn",  "player_index": -1, "round": "turn", "cards": ["Ac"]},
#       {"action": "check",      "player_index": 2},
#       {"action": "check",      "player_index": 3},

#       {"action": "deal_river", "player_index": -1, "round": "river", "cards": ["Th"]},
#       {"action": "bet",        "player_index": 2, "amount": 80},
#       {"action": "raise",      "player_index": 3, "amount": 160},
#       {"action": "call",       "player_index": 2, "amount": 80}
#     ],
#         "stackForAll": 1000,
#         "holeCards": ["Tc2c", "5d4c", "Ah4s", "QcTd", "Js9d", "8h6s"],
#         "id": "demo-123"
#     }

# stack, hands, actions, winnings, positions = evaluate_hand(to_send)

# print("stack     :", stack)
# print("hands     :", hands)
# print("actions   :", actions)
# print("winnings  :", winnings)
# print("positions :", positions)
