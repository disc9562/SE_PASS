*** Setting ***
Library    Selenium2Library    implicit_wait=3s
Resource    ../Keywords.txt
Resource    Keywords.txt
Suite Setup     Open Chrom Browser
Suite Teardown    Close Browser

*** Test Cases ***
Admin Add Student To Course And Verify It
    Login As admin
    Create One Account    teacher    teacher1
    Create One Course    SE    teacher1    星期三 17:00~18:00    60    SE
    Create One Course    ALSD    teacher1    星期三 17:00~18:00    60    ALSD
    Verify Course    ALSD    SE
    Delete All Account
    Delete All Class