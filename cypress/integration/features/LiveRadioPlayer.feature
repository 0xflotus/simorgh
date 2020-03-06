Feature: Live Radio Player

    @test
    Scenario Outline: Verify audio plays on live radio page
        Given I navigate to <URL>
        When I click the play radio button
        Then the radio plays
        Examples:
            | URL                                                        |
            | https://www.test.bbc.com/korean/bbc_korean_radio/liveradio |
# amp not currently supported
# | https://www.test.bbc.com/korean/bbc_korean_radio/liveradio.amp |

    @live
    Scenario Outline: Verify audio plays on live radio page
        Given I navigate to <URL>
        When I click the play radio button
        Then the radio plays
        Examples:
            | URL                                                        |
            | https://www.bbc.com/korean/bbc_korean_radio/liveradio |
# amp not currently supported
# | https://www.bbc.com/korean/bbc_korean_radio/liveradio.amp |
