*** Setting ***
Library    Selenium2Library    implicit_wait=3s
Resource    ../Keywords.txt
Resource    Keywords.txt
Suite Setup    Open Chrom Browser    

Suite Teardown    Close Browser

*** Test Cases ***
Admin Add Student To Course And Verify It
    Login As admin
    Create One Account    teacher    t1
    Create One Account    student    s1
    Create One Account    student    s2
    Create One Course    POSD    t1    星期三 17:00~18:00    60    POSD
    Choose Course    POSD    s1    s2
    Click CourseDetail And Verify It    POSD    s1    s2
    Delete All Account
    Delete All Class
