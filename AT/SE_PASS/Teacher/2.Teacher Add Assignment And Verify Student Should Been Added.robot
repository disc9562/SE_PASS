*** Setting ***
Library    Selenium2Library    implicit_wait=1s
Resource    ../Keywords.txt
Resource    ./Keywords.txt
Resource    ../Admin/Keywords.txt
Suite Setup    Open Chrom Browser
Suite Teardown    Close Browser

*** Test Cases ***
Teacher Add Assignment And Verify Student Should Been Added
    Login As admin
    Create One Account   teacher    t1
    Create One Account   student    s1
    Create One Account   student    s2
    Create One Course    POSD    t1    星期三 17:00~18:00    60    POSD
    Choose Course    POSD    s1    s2
    Logout
    Login As teacher
    User Course Should Contains    POSD    t1    星期三 17:00~18:00    60    POSD
    User Enter The POSD
    Add An Assignment    hw1    POSD-hw1
    Verify Assignment    hw1
    Verify Stundent Should Added By AssignmentDetail   s1    s2