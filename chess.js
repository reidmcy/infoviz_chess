var margin = {
    top: 20,
    right: 120,
    bottom: 20,
    left: 120
  },
  width = 960 - margin.right - margin.left,
  height = 800 - margin.top - margin.bottom;

var root = {
  name: "root",
  parent: "null",
  fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
  children: [
    {
      name: "f2f4",
      parent: "root",
      fen: "rnbqkbnr/pppppppp/8/8/5P2/8/PPPPP1PP/RNBQKBNR b KQkq - 0 1",
      children: []
    },
    {
      name: "a2a3",
      parent: "root",
      fen: "rnbqkbnr/pppppppp/8/8/8/P7/1PPPPPPP/RNBQKBNR b KQkq - 0 1",
      children: [
        {
          name: "e7e5",
          parent: "a2a3",
          fen: "rnbqkbnr/pppp1ppp/8/4p3/8/P7/1PPPPPPP/RNBQKBNR w KQkq - 0 2",
          children: []
        },
        {
          name: "b8c6",
          parent: "a2a3",
          fen: "r1bqkbnr/pppppppp/2n5/8/8/P7/1PPPPPPP/RNBQKBNR w KQkq - 1 2",
          children: [
            {
              name: "f2f4",
              parent: "b8c6",
              fen:
                "r1bqkbnr/pppppppp/2n5/8/5P2/P7/1PPPP1PP/RNBQKBNR b KQkq - 0 2",
              children: []
            }
          ]
        },
        {
          name: "f7f5",
          parent: "a2a3",
          fen: "rnbqkbnr/ppppp1pp/8/5p2/8/P7/1PPPPPPP/RNBQKBNR w KQkq - 0 2",
          children: []
        },
        {
          name: "d7d6",
          parent: "a2a3",
          fen: "rnbqkbnr/ppp1pppp/3p4/8/8/P7/1PPPPPPP/RNBQKBNR w KQkq - 0 2",
          children: []
        },
        {
          name: "b7b5",
          parent: "a2a3",
          fen: "rnbqkbnr/p1pppppp/8/1p6/8/P7/1PPPPPPP/RNBQKBNR w KQkq - 0 2",
          children: [
            {
              name: "d2d4",
              parent: "b7b5",
              fen:
                "rnbqkbnr/p1pppppp/8/1p6/3P4/P7/1PP1PPPP/RNBQKBNR b KQkq - 0 2",
              children: [
                {
                  name: "f7f5",
                  parent: "d2d4",
                  fen:
                    "rnbqkbnr/p1ppp1pp/8/1p3p2/3P4/P7/1PP1PPPP/RNBQKBNR w KQkq - 0 3",
                  children: [
                    {
                      name: "g2g3",
                      parent: "f7f5",
                      fen:
                        "rnbqkbnr/p1ppp1pp/8/1p3p2/3P4/P5P1/1PP1PP1P/RNBQKBNR b KQkq - 0 3",
                      children: []
                    }
                  ]
                },
                {
                  name: "c7c6",
                  parent: "d2d4",
                  fen:
                    "rnbqkbnr/p2ppppp/2p5/1p6/3P4/P7/1PP1PPPP/RNBQKBNR w KQkq - 0 3",
                  children: [
                    {
                      name: "b2b4",
                      parent: "c7c6",
                      fen:
                        "rnbqkbnr/p2ppppp/2p5/1p6/1P1P4/P7/2P1PPPP/RNBQKBNR b KQkq - 0 3",
                      children: []
                    }
                  ]
                }
              ]
            },
            {
              name: "h2h4",
              parent: "b7b5",
              fen:
                "rnbqkbnr/p1pppppp/8/1p6/7P/P7/1PPPPPP1/RNBQKBNR b KQkq - 0 2",
              children: []
            },
            {
              name: "a3a4",
              parent: "b7b5",
              fen:
                "rnbqkbnr/p1pppppp/8/1p6/P7/8/1PPPPPPP/RNBQKBNR b KQkq - 0 2",
              children: [
                {
                  name: "b5a4",
                  parent: "a3a4",
                  fen:
                    "rnbqkbnr/p1pppppp/8/8/p7/8/1PPPPPPP/RNBQKBNR w KQkq - 0 3",
                  children: [
                    {
                      name: "b2b4",
                      parent: "b5a4",
                      fen:
                        "rnbqkbnr/p1pppppp/8/8/pP6/8/2PPPPPP/RNBQKBNR b KQkq b3 0 3",
                      children: []
                    }
                  ]
                },
                {
                  name: "c7c5",
                  parent: "a3a4",
                  fen:
                    "rnbqkbnr/p2ppppp/8/1pp5/P7/8/1PPPPPPP/RNBQKBNR w KQkq - 0 3",
                  children: [
                    {
                      name: "d2d3",
                      parent: "c7c5",
                      fen:
                        "rnbqkbnr/p2ppppp/8/1pp5/P7/3P4/1PP1PPPP/RNBQKBNR b KQkq - 0 3",
                      children: [
                        {
                          name: "b5b4",
                          parent: "d2d3",
                          fen:
                            "rnbqkbnr/p2ppppp/8/2p5/Pp6/3P4/1PP1PPPP/RNBQKBNR w KQkq - 0 4",
                          children: []
                        }
                      ]
                    },
                    {
                      name: "f2f4",
                      parent: "c7c5",
                      fen:
                        "rnbqkbnr/p2ppppp/8/1pp5/P4P2/8/1PPPP1PP/RNBQKBNR b KQkq - 0 3",
                      children: []
                    }
                  ]
                },
                {
                  name: "c8a6",
                  parent: "a3a4",
                  fen:
                    "rn1qkbnr/p1pppppp/b7/1p6/P7/8/1PPPPPPP/RNBQKBNR w KQkq - 1 3",
                  children: [
                    {
                      name: "d2d3",
                      parent: "c8a6",
                      fen:
                        "rn1qkbnr/p1pppppp/b7/1p6/P7/3P4/1PP1PPPP/RNBQKBNR b KQkq - 0 3",
                      children: [
                        {
                          name: "b5a4",
                          parent: "d2d3",
                          fen:
                            "rn1qkbnr/p1pppppp/b7/8/p7/3P4/1PP1PPPP/RNBQKBNR w KQkq - 0 4",
                          children: [
                            {
                              name: "c2c4",
                              parent: "b5a4",
                              fen:
                                "rn1qkbnr/p1pppppp/b7/8/p1P5/3P4/1P2PPPP/RNBQKBNR b KQkq - 0 4",
                              children: []
                            }
                          ]
                        },
                        {
                          name: "e7e5",
                          parent: "d2d3",
                          fen:
                            "rn1qkbnr/p1pp1ppp/b7/1p2p3/P7/3P4/1PP1PPPP/RNBQKBNR w KQkq - 0 4",
                          children: [
                            {
                              name: "d3d4",
                              parent: "e7e5",
                              fen:
                                "rn1qkbnr/p1pp1ppp/b7/1p2p3/P2P4/8/1PP1PPPP/RNBQKBNR b KQkq - 0 4",
                              children: []
                            }
                          ]
                        },
                        {
                          name: "g7g6",
                          parent: "d2d3",
                          fen:
                            "rn1qkbnr/p1pppp1p/b5p1/1p6/P7/3P4/1PP1PPPP/RNBQKBNR w KQkq - 0 4",
                          children: [
                            {
                              name: "c2c4",
                              parent: "g7g6",
                              fen:
                                "rn1qkbnr/p1pppp1p/b5p1/1p6/P1P5/3P4/1P2PPPP/RNBQKBNR b KQkq - 0 4",
                              children: []
                            },
                            {
                              name: "c2c3",
                              parent: "g7g6",
                              fen:
                                "rn1qkbnr/p1pppp1p/b5p1/1p6/P7/2PP4/1P2PPPP/RNBQKBNR b KQkq - 0 4",
                              children: []
                            },
                            {
                              name: "g2g3",
                              parent: "g7g6",
                              fen:
                                "rn1qkbnr/p1pppp1p/b5p1/1p6/P7/3P2P1/1PP1PP1P/RNBQKBNR b KQkq - 0 4",
                              children: [
                                {
                                  name: "a6b7",
                                  parent: "g2g3",
                                  fen:
                                    "rn1qkbnr/pbpppp1p/6p1/1p6/P7/3P2P1/1PP1PP1P/RNBQKBNR w KQkq - 1 5",
                                  children: [
                                    {
                                      name: "c1f4",
                                      parent: "a6b7",
                                      fen:
                                        "rn1qkbnr/pbpppp1p/6p1/1p6/P4B2/3P2P1/1PP1PP1P/RN1QKBNR b KQkq - 2 5",
                                      children: [
                                        {
                                          name: "e7e6",
                                          parent: "c1f4",
                                          fen:
                                            "rn1qkbnr/pbpp1p1p/4p1p1/1p6/P4B2/3P2P1/1PP1PP1P/RN1QKBNR w KQkq - 0 6",
                                          children: []
                                        }
                                      ]
                                    },
                                    {
                                      name: "a1a3",
                                      parent: "a6b7",
                                      fen:
                                        "rn1qkbnr/pbpppp1p/6p1/1p6/P7/R2P2P1/1PP1PP1P/1NBQKBNR b Kkq - 2 5",
                                      children: []
                                    },
                                    {
                                      name: "f2f4",
                                      parent: "a6b7",
                                      fen:
                                        "rn1qkbnr/pbpppp1p/6p1/1p6/P4P2/3P2P1/1PP1P2P/RNBQKBNR b KQkq - 0 5",
                                      children: [
                                        {
                                          name: "a7a6",
                                          parent: "f2f4",
                                          fen:
                                            "rn1qkbnr/1bpppp1p/p5p1/1p6/P4P2/3P2P1/1PP1P2P/RNBQKBNR w KQkq - 0 6",
                                          children: []
                                        },
                                        {
                                          name: "b8a6",
                                          parent: "f2f4",
                                          fen:
                                            "r2qkbnr/pbpppp1p/n5p1/1p6/P4P2/3P2P1/1PP1P2P/RNBQKBNR w KQkq - 1 6",
                                          children: []
                                        }
                                      ]
                                    },
                                    {
                                      name: "e2e4",
                                      parent: "a6b7",
                                      fen:
                                        "rn1qkbnr/pbpppp1p/6p1/1p6/P3P3/3P2P1/1PP2P1P/RNBQKBNR b KQkq - 0 5",
                                      children: [
                                        {
                                          name: "h7h6",
                                          parent: "e2e4",
                                          fen:
                                            "rn1qkbnr/pbpppp2/6pp/1p6/P3P3/3P2P1/1PP2P1P/RNBQKBNR w KQkq - 0 6",
                                          children: []
                                        },
                                        {
                                          name: "g8f6",
                                          parent: "e2e4",
                                          fen:
                                            "rn1qkb1r/pbpppp1p/5np1/1p6/P3P3/3P2P1/1PP2P1P/RNBQKBNR w KQkq - 1 6",
                                          children: []
                                        }
                                      ]
                                    },
                                    {
                                      name: "d3d4",
                                      parent: "a6b7",
                                      fen:
                                        "rn1qkbnr/pbpppp1p/6p1/1p6/P2P4/6P1/1PP1PP1P/RNBQKBNR b KQkq - 0 5",
                                      children: [
                                        {
                                          name: "a7a5",
                                          parent: "d3d4",
                                          fen:
                                            "rn1qkbnr/1bpppp1p/6p1/pp6/P2P4/6P1/1PP1PP1P/RNBQKBNR w KQkq - 0 6",
                                          children: []
                                        },
                                        {
                                          name: "b5a4",
                                          parent: "d3d4",
                                          fen:
                                            "rn1qkbnr/pbpppp1p/6p1/8/p2P4/6P1/1PP1PP1P/RNBQKBNR w KQkq - 0 6",
                                          children: []
                                        },
                                        {
                                          name: "d8c8",
                                          parent: "d3d4",
                                          fen:
                                            "rnq1kbnr/pbpppp1p/6p1/1p6/P2P4/6P1/1PP1PP1P/RNBQKBNR w KQkq - 1 6",
                                          children: []
                                        },
                                        {
                                          name: "d7d5",
                                          parent: "d3d4",
                                          fen:
                                            "rn1qkbnr/pbp1pp1p/6p1/1p1p4/P2P4/6P1/1PP1PP1P/RNBQKBNR w KQkq - 0 6",
                                          children: []
                                        },
                                        {
                                          name: "h7h5",
                                          parent: "d3d4",
                                          fen:
                                            "rn1qkbnr/pbpppp2/6p1/1p5p/P2P4/6P1/1PP1PP1P/RNBQKBNR w KQkq - 0 6",
                                          children: []
                                        }
                                      ]
                                    }
                                  ]
                                },
                                {
                                  name: "b8c6",
                                  parent: "g2g3",
                                  fen:
                                    "r2qkbnr/p1pppp1p/b1n3p1/1p6/P7/3P2P1/1PP1PP1P/RNBQKBNR w KQkq - 1 5",
                                  children: []
                                },
                                {
                                  name: "d7d5",
                                  parent: "g2g3",
                                  fen:
                                    "rn1qkbnr/p1p1pp1p/b5p1/1p1p4/P7/3P2P1/1PP1PP1P/RNBQKBNR w KQkq - 0 5",
                                  children: [
                                    {
                                      name: "b2b4",
                                      parent: "d7d5",
                                      fen:
                                        "rn1qkbnr/p1p1pp1p/b5p1/1p1p4/PP6/3P2P1/2P1PP1P/RNBQKBNR b KQkq - 0 5",
                                      children: []
                                    },
                                    {
                                      name: "g3g4",
                                      parent: "d7d5",
                                      fen:
                                        "rn1qkbnr/p1p1pp1p/b5p1/1p1p4/P5P1/3P4/1PP1PP1P/RNBQKBNR b KQkq - 0 5",
                                      children: [
                                        {
                                          name: "g8h6",
                                          parent: "g3g4",
                                          fen:
                                            "rn1qkb1r/p1p1pp1p/b5pn/1p1p4/P5P1/3P4/1PP1PP1P/RNBQKBNR w KQkq - 1 6",
                                          children: []
                                        }
                                      ]
                                    }
                                  ]
                                },
                                {
                                  name: "e7e6",
                                  parent: "g2g3",
                                  fen:
                                    "rn1qkbnr/p1pp1p1p/b3p1p1/1p6/P7/3P2P1/1PP1PP1P/RNBQKBNR w KQkq - 0 5",
                                  children: []
                                },
                                {
                                  name: "f7f5",
                                  parent: "g2g3",
                                  fen:
                                    "rn1qkbnr/p1ppp2p/b5p1/1p3p2/P7/3P2P1/1PP1PP1P/RNBQKBNR w KQkq - 0 5",
                                  children: []
                                }
                              ]
                            },
                            {
                              name: "c1f4",
                              parent: "g7g6",
                              fen:
                                "rn1qkbnr/p1pppp1p/b5p1/1p6/P4B2/3P4/1PP1PPPP/RN1QKBNR b KQkq - 1 4",
                              children: [
                                {
                                  name: "c7c5",
                                  parent: "c1f4",
                                  fen:
                                    "rn1qkbnr/p2ppp1p/b5p1/1pp5/P4B2/3P4/1PP1PPPP/RN1QKBNR w KQkq - 0 5",
                                  children: [
                                    {
                                      name: "f2f3",
                                      parent: "c7c5",
                                      fen:
                                        "rn1qkbnr/p2ppp1p/b5p1/1pp5/P4B2/3P1P2/1PP1P1PP/RN1QKBNR b KQkq - 0 5",
                                      children: []
                                    }
                                  ]
                                },
                                {
                                  name: "g8h6",
                                  parent: "c1f4",
                                  fen:
                                    "rn1qkb1r/p1pppp1p/b5pn/1p6/P4B2/3P4/1PP1PPPP/RN1QKBNR w KQkq - 2 5",
                                  children: []
                                }
                              ]
                            },
                            {
                              name: "a4b5",
                              parent: "g7g6",
                              fen:
                                "rn1qkbnr/p1pppp1p/b5p1/1P6/8/3P4/1PP1PPPP/RNBQKBNR b KQkq - 0 4",
                              children: [
                                {
                                  name: "a6c8",
                                  parent: "a4b5",
                                  fen:
                                    "rnbqkbnr/p1pppp1p/6p1/1P6/8/3P4/1PP1PPPP/RNBQKBNR w KQkq - 1 5",
                                  children: []
                                }
                              ]
                            }
                          ]
                        },
                        {
                          name: "f7f6",
                          parent: "d2d3",
                          fen:
                            "rn1qkbnr/p1ppp1pp/b4p2/1p6/P7/3P4/1PP1PPPP/RNBQKBNR w KQkq - 0 4",
                          children: [
                            {
                              name: "d1d2",
                              parent: "f7f6",
                              fen:
                                "rn1qkbnr/p1ppp1pp/b4p2/1p6/P7/3P4/1PPQPPPP/RNB1KBNR b KQkq - 1 4",
                              children: [
                                {
                                  name: "g7g6",
                                  parent: "d1d2",
                                  fen:
                                    "rn1qkbnr/p1ppp2p/b4pp1/1p6/P7/3P4/1PPQPPPP/RNB1KBNR w KQkq - 0 5",
                                  children: []
                                }
                              ]
                            },
                            {
                              name: "a1a3",
                              parent: "f7f6",
                              fen:
                                "rn1qkbnr/p1ppp1pp/b4p2/1p6/P7/R2P4/1PP1PPPP/1NBQKBNR b Kkq - 1 4",
                              children: [
                                {
                                  name: "d8c8",
                                  parent: "a1a3",
                                  fen:
                                    "rnq1kbnr/p1ppp1pp/b4p2/1p6/P7/R2P4/1PP1PPPP/1NBQKBNR w Kkq - 2 5",
                                  children: []
                                }
                              ]
                            }
                          ]
                        },
                        {
                          name: "d7d5",
                          parent: "d2d3",
                          fen:
                            "rn1qkbnr/p1p1pppp/b7/1p1p4/P7/3P4/1PP1PPPP/RNBQKBNR w KQkq - 0 4",
                          children: [
                            {
                              name: "b2b3",
                              parent: "d7d5",
                              fen:
                                "rn1qkbnr/p1p1pppp/b7/1p1p4/P7/1P1P4/2P1PPPP/RNBQKBNR b KQkq - 0 4",
                              children: [
                                {
                                  name: "e8d7",
                                  parent: "b2b3",
                                  fen:
                                    "rn1q1bnr/p1pkpppp/b7/1p1p4/P7/1P1P4/2P1PPPP/RNBQKBNR w KQ - 1 5",
                                  children: []
                                }
                              ]
                            },
                            {
                              name: "g1f3",
                              parent: "d7d5",
                              fen:
                                "rn1qkbnr/p1p1pppp/b7/1p1p4/P7/3P1N2/1PP1PPPP/RNBQKB1R b KQkq - 1 4",
                              children: []
                            }
                          ]
                        }
                      ]
                    },
                    {
                      name: "a1a2",
                      parent: "c8a6",
                      fen:
                        "rn1qkbnr/p1pppppp/b7/1p6/P7/8/RPPPPPPP/1NBQKBNR b Kkq - 2 3",
                      children: [
                        {
                          name: "f7f6",
                          parent: "a1a2",
                          fen:
                            "rn1qkbnr/p1ppp1pp/b4p2/1p6/P7/8/RPPPPPPP/1NBQKBNR w Kkq - 0 4",
                          children: [
                            {
                              name: "d2d4",
                              parent: "f7f6",
                              fen:
                                "rn1qkbnr/p1ppp1pp/b4p2/1p6/P2P4/8/RPP1PPPP/1NBQKBNR b Kkq - 0 4",
                              children: []
                            }
                          ]
                        },
                        {
                          name: "d7d5",
                          parent: "a1a2",
                          fen:
                            "rn1qkbnr/p1p1pppp/b7/1p1p4/P7/8/RPPPPPPP/1NBQKBNR w Kkq - 0 4",
                          children: [
                            {
                              name: "d2d4",
                              parent: "d7d5",
                              fen:
                                "rn1qkbnr/p1p1pppp/b7/1p1p4/P2P4/8/RPP1PPPP/1NBQKBNR b Kkq - 0 4",
                              children: []
                            }
                          ]
                        }
                      ]
                    },
                    {
                      name: "g2g3",
                      parent: "c8a6",
                      fen:
                        "rn1qkbnr/p1pppppp/b7/1p6/P7/6P1/1PPPPP1P/RNBQKBNR b KQkq - 0 3",
                      children: [
                        {
                          name: "b5b4",
                          parent: "g2g3",
                          fen:
                            "rn1qkbnr/p1pppppp/b7/8/Pp6/6P1/1PPPPP1P/RNBQKBNR w KQkq - 0 4",
                          children: []
                        },
                        {
                          name: "b5a4",
                          parent: "g2g3",
                          fen:
                            "rn1qkbnr/p1pppppp/b7/8/p7/6P1/1PPPPP1P/RNBQKBNR w KQkq - 0 4",
                          children: [
                            {
                              name: "b2b4",
                              parent: "b5a4",
                              fen:
                                "rn1qkbnr/p1pppppp/b7/8/pP6/6P1/2PPPP1P/RNBQKBNR b KQkq b3 0 4",
                              children: []
                            }
                          ]
                        }
                      ]
                    },
                    {
                      name: "h2h3",
                      parent: "c8a6",
                      fen:
                        "rn1qkbnr/p1pppppp/b7/1p6/P7/7P/1PPPPPP1/RNBQKBNR b KQkq - 0 3",
                      children: [
                        {
                          name: "h7h5",
                          parent: "h2h3",
                          fen:
                            "rn1qkbnr/p1ppppp1/b7/1p5p/P7/7P/1PPPPPP1/RNBQKBNR w KQkq - 0 4",
                          children: [
                            {
                              name: "a1a2",
                              parent: "h7h5",
                              fen:
                                "rn1qkbnr/p1ppppp1/b7/1p5p/P7/7P/RPPPPPP1/1NBQKBNR b Kkq - 1 4",
                              children: []
                            }
                          ]
                        },
                        {
                          name: "g8f6",
                          parent: "h2h3",
                          fen:
                            "rn1qkb1r/p1pppppp/b4n2/1p6/P7/7P/1PPPPPP1/RNBQKBNR w KQkq - 1 4",
                          children: [
                            {
                              name: "b1a3",
                              parent: "g8f6",
                              fen:
                                "rn1qkb1r/p1pppppp/b4n2/1p6/P7/N6P/1PPPPPP1/R1BQKBNR b KQkq - 2 4",
                              children: []
                            }
                          ]
                        }
                      ]
                    },
                    {
                      name: "a4a5",
                      parent: "c8a6",
                      fen:
                        "rn1qkbnr/p1pppppp/b7/Pp6/8/8/1PPPPPPP/RNBQKBNR b KQkq - 0 3",
                      children: [
                        {
                          name: "c7c6",
                          parent: "a4a5",
                          fen:
                            "rn1qkbnr/p2ppppp/b1p5/Pp6/8/8/1PPPPPPP/RNBQKBNR w KQkq - 0 4",
                          children: []
                        }
                      ]
                    }
                  ]
                },
                {
                  name: "h7h5",
                  parent: "a3a4",
                  fen:
                    "rnbqkbnr/p1ppppp1/8/1p5p/P7/8/1PPPPPPP/RNBQKBNR w KQkq - 0 3",
                  children: [
                    {
                      name: "d2d3",
                      parent: "h7h5",
                      fen:
                        "rnbqkbnr/p1ppppp1/8/1p5p/P7/3P4/1PP1PPPP/RNBQKBNR b KQkq - 0 3",
                      children: [
                        {
                          name: "d7d6",
                          parent: "d2d3",
                          fen:
                            "rnbqkbnr/p1p1ppp1/3p4/1p5p/P7/3P4/1PP1PPPP/RNBQKBNR w KQkq - 0 4",
                          children: []
                        }
                      ]
                    },
                    {
                      name: "b1a3",
                      parent: "h7h5",
                      fen:
                        "rnbqkbnr/p1ppppp1/8/1p5p/P7/N7/1PPPPPPP/R1BQKBNR b KQkq - 1 3",
                      children: [
                        {
                          name: "e7e5",
                          parent: "b1a3",
                          fen:
                            "rnbqkbnr/p1pp1pp1/8/1p2p2p/P7/N7/1PPPPPPP/R1BQKBNR w KQkq - 0 4",
                          children: []
                        }
                      ]
                    }
                  ]
                },
                {
                  name: "g8f6",
                  parent: "a3a4",
                  fen:
                    "rnbqkb1r/p1pppppp/5n2/1p6/P7/8/1PPPPPPP/RNBQKBNR w KQkq - 1 3",
                  children: [
                    {
                      name: "g1f3",
                      parent: "g8f6",
                      fen:
                        "rnbqkb1r/p1pppppp/5n2/1p6/P7/5N2/1PPPPPPP/RNBQKB1R b KQkq - 2 3",
                      children: []
                    }
                  ]
                }
              ]
            },
            {
              name: "b2b4",
              parent: "b7b5",
              fen:
                "rnbqkbnr/p1pppppp/8/1p6/1P6/P7/2PPPPPP/RNBQKBNR b KQkq - 0 2",
              children: [
                {
                  name: "e7e5",
                  parent: "b2b4",
                  fen:
                    "rnbqkbnr/p1pp1ppp/8/1p2p3/1P6/P7/2PPPPPP/RNBQKBNR w KQkq - 0 3",
                  children: [
                    {
                      name: "g1f3",
                      parent: "e7e5",
                      fen:
                        "rnbqkbnr/p1pp1ppp/8/1p2p3/1P6/P4N2/2PPPPPP/RNBQKB1R b KQkq - 1 3",
                      children: []
                    }
                  ]
                },
                {
                  name: "a7a5",
                  parent: "b2b4",
                  fen:
                    "rnbqkbnr/2pppppp/8/pp6/1P6/P7/2PPPPPP/RNBQKBNR w KQkq - 0 3",
                  children: [
                    {
                      name: "c1b2",
                      parent: "a7a5",
                      fen:
                        "rnbqkbnr/2pppppp/8/pp6/1P6/P7/1BPPPPPP/RN1QKBNR b KQkq - 1 3",
                      children: []
                    }
                  ]
                }
              ]
            },
            {
              name: "g2g4",
              parent: "b7b5",
              fen:
                "rnbqkbnr/p1pppppp/8/1p6/6P1/P7/1PPPPP1P/RNBQKBNR b KQkq - 0 2",
              children: []
            }
          ]
        }
      ]
    },
    {
      name: "b2b3",
      parent: "root",
      fen: "rnbqkbnr/pppppppp/8/8/8/1P6/P1PPPPPP/RNBQKBNR b KQkq - 0 1",
      children: []
    },
    {
      name: "g2g3",
      parent: "root",
      fen: "rnbqkbnr/pppppppp/8/8/8/6P1/PPPPPP1P/RNBQKBNR b KQkq - 0 1",
      children: [
        {
          name: "b8a6",
          parent: "g2g3",
          fen: "r1bqkbnr/pppppppp/n7/8/8/6P1/PPPPPP1P/RNBQKBNR w KQkq - 1 2",
          children: [
            {
              name: "f1h3",
              parent: "b8a6",
              fen:
                "r1bqkbnr/pppppppp/n7/8/8/6PB/PPPPPP1P/RNBQK1NR b KQkq - 2 2",
              children: []
            }
          ]
        },
        {
          name: "g8h6",
          parent: "g2g3",
          fen: "rnbqkb1r/pppppppp/7n/8/8/6P1/PPPPPP1P/RNBQKBNR w KQkq - 1 2",
          children: []
        }
      ]
    },
    {
      name: "b1a3",
      parent: "root",
      fen: "rnbqkbnr/pppppppp/8/8/8/N7/PPPPPPPP/R1BQKBNR b KQkq - 1 1",
      children: [
        {
          name: "f7f5",
          parent: "b1a3",
          fen: "rnbqkbnr/ppppp1pp/8/5p2/8/N7/PPPPPPPP/R1BQKBNR w KQkq - 0 2",
          children: []
        }
      ]
    }
  ]
};

var i = 0,
  duration = 750,
  rectW = 60,
  rectH = 30;

var flag_mouse = false;

var tree = d3.layout.tree().nodeSize([70, 40]); // Creates a new tree layout with the default settings
//The next block of code declares the function that will be used to draw the links between the nodes.
//This isn’t the part of the code where the links are drawn, this is just declaring the variable/function
// that will be used when it does happen.
var diagonal = d3.svg.diagonal().projection(function(d) {
  return [d.x + rectW / 2, d.y + rectH / 2];
});

//The next block of code appends our SVG working area to the body of our web page and creates
// a group elements (<g>) that will contain our svg objects (our nodes, text and links).
var svg = d3
  .select("#tree_part")
  .append("svg")
  .attr("width", "100%")
  .attr("height", "1000")
  .style("background-color", "#E5E5E5")
  .call(
    (zm = d3.behavior
      .zoom()
      .scaleExtent([0.2, 8]) // amount of zoom
      .on("zoom", redraw))
  )
  .append("g")
  .attr("transform", "translate(" + 350 + "," + 20 + ")");

//necessary so that zoom knows where to zoom and unzoom from
zm.translate([350, 20]);

root.x0 = 0;
root.y0 = height / 2;

function collapse(d) {
  if (d.children) {
    d._children = d.children;
    d._children.forEach(collapse);
    d.children = null;
  }
}

// create a tooltip
var tooltip = d3
  .select("#info_part")
  .append("div")
  .style("position", "absolute")
  .style("visibility", "hidden");
//   .text("I'm a circle!");

root.children.forEach(collapse);
update(root);
d3.select(self.frameElement).style("height", "800px");

function update(source) {
  // Compute the new tree layout.
  var nodes = tree.nodes(root).reverse(), // Runs the tree layout, returning the array of nodes associated with the specified root node
    links = tree.links(nodes);
  // Normalize for fixed-depth.
  nodes.forEach(function(d) {
    d.y = d.depth * 100;
  });

  // Update the nodes…
  var node = svg.selectAll("g.node").data(nodes, function(d) {
    // We then declare the variable / function node so that when we call it
    // later it will know to select the appropriate object (a node) with the appropriate .id
    return d.id || (d.id = ++i);
  });

  // Enter any new nodes at the parent's previous position.
  var nodeEnter = node
    .enter()
    .append("g")
    .attr("class", "node")
    .attr("transform", function(d) {
      return "translate(" + source.x0 + "," + source.y0 + ")";
    })
    .on("click", click)
    .on("mouseover", function(d) {
      // Use D3 to select element, change color and size
      if (!flag_mouse) {
        d3.select(this).attr({
          fill: "orange"
        });
        tooltip
          .html(
            "node ID: " +
              d.id +
              "<br>" +
              "node name: " +
              d.name +
              "<br>" +
              "..."
          )
          .style("visibility", "visible");

        //reset all the data to have color undefined.
        // flatten(root).forEach(function(d) {
        //   d.color = undefined;
        // });
        //iterate over the selected node and set color as red.
        //till it reaches the root
        while (d.parent) {
          d.color = "red";
          console.log(d.color);
          d = d.parent;
        }

        d3.selectAll("path").style("stroke", function(d) {
          if (d.target.color) {
            return d.target.color; //if the value is set
          } else {
            return "gray";
          }
        });

        update(d);
      }
    })
    .on("mouseout", function(d) {
      if (!flag_mouse) {
        d3.select(this).attr({
          fill: "black"
        });
        tooltip.style("visibility", "hidden");
        svg.selectAll("path.link").style("stroke", function(d) {
          d.target.color = "gray";
          return "gray";
        });
        update(d);
      }
    });

  nodeEnter
    .append("rect")
    .attr("width", rectW)
    .attr("height", rectH)
    .attr("stroke", "black")
    .attr("stroke-width", 1)
    .style("fill", function(d) {
      return d._children ? "lightsteelblue" : "#fff";
    });

  nodeEnter
    .append("text")
    .attr("x", rectW / 2)
    .attr("y", rectH / 2)
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    .text(function(d) {
      return d.name;
    });

  // Transition nodes to their new position.
  var nodeUpdate = node
    .transition()
    .each("end", transition_over)
    .duration(duration)
    .attr("transform", function(d) {
      return "translate(" + d.x + "," + d.y + ")";
    });

  nodeUpdate
    .select("rect")
    .attr("width", rectW)
    .attr("height", rectH)
    .attr("stroke", "black")
    .attr("stroke-width", 1)
    .style("fill", function(d) {
      return d._children ? "lightsteelblue" : "#fff";
    });

  nodeUpdate.select("text").style("fill-opacity", 1);

  // Transition exiting nodes to the parent's new position.
  var nodeExit = node
    .exit()
    .transition()
    .duration(duration)
    .attr("transform", function(d) {
      return "translate(" + source.x + "," + source.y + ")";
    })
    .remove();

  nodeExit
    .select("rect")
    .attr("width", rectW)
    .attr("height", rectH)
    //.attr("width", bbox.getBBox().width)""
    //.attr("height", bbox.getBBox().height)
    .attr("stroke", "black")
    .attr("stroke-width", 1);

  nodeExit.select("text");

  // Update the links…
  var link = svg.selectAll("path.link").data(links, function(d) {
    return d.target.id;
  });

  // Enter any new links at the parent's previous position.
  link
    .enter()
    .insert("path", "g")
    .attr("class", "link")
    .attr("x", rectW / 2)
    .attr("y", rectH / 2)
    .attr("d", function(d) {
      var o = {
        x: source.x0,
        y: source.y0
      };
      return diagonal({
        source: o,
        target: o
      });
    });

  // Transition links to their new position.
  link
    .transition()
    .duration(duration)
    .attr("d", diagonal);

  // Transition exiting nodes to the parent's new position.
  link
    .exit()
    .transition()
    .duration(duration)
    .attr("d", function(d) {
      var o = {
        x: source.x,
        y: source.y
      };
      return diagonal({
        source: o,
        target: o
      });
    })
    .remove();

  // Stash the old positions for transition.
  nodes.forEach(function(d) {
    d.x0 = d.x;
    d.y0 = d.y;
  });
}

// Toggle children on click.
function click(d) {
  flag_mouse = true;
  if (d.children) {
    d._children = d.children;
    d.children = null;
  } else {
    d.children = d._children;
    d._children = null;
  }
  update(d);
}

function dist2(a, b) {
  return (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2;
}

function makeParentGray(node) {
  if (node === root) {
    return;
  } else {
    // makeLinkGray()
    return makeParentGray(parent);
  }
}

function flatten(root) {
  var nodes = [],
    i = 0;

  function recurse(node) {
    if (node.children) node.children.forEach(recurse);
    if (node._children) node._children.forEach(recurse);
    if (!node.id) node.id = ++i;
    nodes.push(node);
  }

  recurse(root);
  return nodes;
}

function transition_over() {
  flag_mouse = false;
}

//Redraw for zoom
function redraw() {
  svg.attr(
    "transform",
    "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")"
  );
}
