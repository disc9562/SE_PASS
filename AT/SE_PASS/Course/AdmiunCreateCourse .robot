*** Setting ***
Library    Selenium2Library    implicit_wait=3s
Resource    ../Keywords.txt
Suite Setup    Open Browser And Login As admin
Suite Teardown    Close Browser

*** Test Cases ***
It Should Shown Correctly Course
    Click Element    xpath://*[contains(text(),'新增課程')]
    Input Text    xpath://input[@id='coursename']    ALSD
    Click Element    xpath://option[@value="謝老師"]
    Input Text    xpath://input[@id='classtime']    每周四下午三點
    Input Text    xpath://input[@id='population']    60
    Input Text    xpath://textarea[@id='coursedescription']    ALSD
    Click Button    xpath://button[contains(text(), '新增課程')]
    @{expectedItems}    Create List    ALSD    謝老師    每周四下午三點    60    ALSD
    Click Element    xpath://*[contains(text(),'課程列表')]
    Log    @{expectedItems}[1]
    @{actualRows}=    Get WebElements    xpath://tr/td[contains(text(),'@{expectedItems}[1]')]/../td[not(contains(@class,'vuetable-slot'))]
    :FOR    ${index}   ${actaulItem}    IN ENUMERATE    @{actualRows}
    \    Log    ${actaulItem.text}
    \    Should Be Equal    ${actaulItem.text}    @{expectedItems}[${index}]
    