*** Setting ***
Library    Selenium2Library    implicit_wait=1s
Resource    ../Keywords.txt
Resource    ./Keywords.txt
Resource    ../Admin/Keywords.txt
Suite Setup    Open Chrom Browser
Suite Teardown    Close Browser

*** Test Cases ***
After Teacher Grading It Should Display Correctly 
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
    Grading One Student    hw1    s1    100    Good
    It Should Display Correctly    s1    100    Good

*** Keywords ***
It Should Display Correctly
    [Arguments]    ${student}    @{gradeDetails}
    :FOR    ${gradeDetail}    IN    @{gradeDetails}
    \    Page Should Contain Element    xpath://*[contains(text(),'${student}')]/../*[contains(text(),'${gradeDetail}')]   

Grading One Student
    [Arguments]    ${hw1}    ${student}    @{gradeDetail}
    Click Button    xpath://*[contains(text(),'hw1')]/../*[contains(@class, 'vuetable-slot')]/descendant::button[contains(text(),'作業批改')]
    Click Button    xpath://*[contains(text(),'${student}')]/../*[contains(@class, 'vuetable-slot')]/descendant::button[contains(text(),'打成績')]
    Input Text    xpath://*[@id='score']    @{gradeDetail}[0]
    Input Text    xpath://*[@id='description']    @{gradeDetail}[1]
    Click Button    xpath://button[text()='儲存']
    