/*
Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information").
You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.
SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

var LanguageSet = {};
var DEFAULT_LOCALE_CODE = 'en_US';
var SupportLangCodes = ['ko_KR', "en_US"];

//find language code.
//"get locale code function." -> navigator.language
// window format en_US
// android format en-US
// iPhone format en
// navigator.language en_US

function getPreferredLocaleCode(localeCode, candidates = SupportLangCodes, defaultLocale = DEFAULT_LOCALE_CODE) {
    localeCode = localeCode.replace('-', '_'); // prevent

    function search(localeCode, candidates) {
      // 1. full code matching
      var code = localeCode;

      if (candidates.includes(code)) {
        return code;
      }

      // 2. language code matching
      code = localeCode.slice(0, 2).toLowerCase(); //get language code
      if (candidates.includes(code)) {
        return code;
      }

      // 3. matching with language code only. (ignore region code)
      for (var candidate of candidates) {
        var tokens = candidate.split('_'); // pass if it doesn't have region code

        if (tokens.length < 2) {
          continue;
        }

        if (tokens[0].toLowerCase() === code) {
          return candidate;
        }
      }

      throw new Error('No available language resource');
    }

    try {
      return search(localeCode, candidates);
    } catch (e) {
      // not found....
      // search for default language
      return search(defaultLocale, candidates);
    }
}

function AddLanguageSet(_obj_) {
    if (_obj_ === null || typeof(_obj_) !== 'object') {
        return;
    }

    var attrList = Object.getOwnPropertyNames(_obj_);
    for (var i in attrList) {
        if (_obj_.hasOwnProperty(attrList[i])) {
            LanguageSet[attrList[i]] = _obj_[attrList[i]];
        }
    }
}

function LoadLanguageSet(_localeCode_) {
    switch (_localeCode_) {
        case 'ko_KR':
            /* ### for Common Device Plugin ### */
            LanguageSet['LOADING'] = "불러오는 중\u2026";
            LanguageSet['PROCESSING'] = "처리중";
            LanguageSet['DIALOG_BUTTON_OK'] = "확인";
            LanguageSet['DIALOG_BUTTON_DONE'] = "완료";
            LanguageSet['DIALOG_BUTTON_CANCEL'] = "취소";

            LanguageSet['VENDOR_CONTACT'] = "연락처";

            LanguageSet['NETWORK_ERROR_TITLE'] = "네트워크 연결 안 됨";
            LanguageSet['NETWORK_ERROR_MESSAGE'] = "연결할 수 없어요. 다시 해보세요.";
            LanguageSet['MOBILE_NETWORK_DISCONNECTED'] = "연결된 네트워크가 없습니다. 네트워크에 연결하고 다시 해보세요.";
            LanguageSet['NETWORK_DISCONNECTED_TITLE'] = "네트워크 연결 안 됨";
            LanguageSet['NETWORK_DISCONNECTED_MESSAGE'] = "네트워크에 연결되었는지 확인하세요. 만약 네트워크에 다시 연결되면 페이지를 업데이트 하세요.";
            LanguageSet['DEVICE_DISCONNECTED_TITLE'] = '디바이스 연결 안 됨';
            LanguageSet['DEVICE_DISCONNECTED_MESSAGE'] = '아파트 월패드의 디바이스 연결 상태를 확인해주세요. 디바이스가 계속 연결되지 않는다면 스마트싱스에 홈 아이오티 서비스를 다시 추가해주세요.';
            LanguageSet['DEVICE_INACTIVE_MESSAGE'] = '%s 정보가 최신이 아닙니다.';
            LanguageSet['DEVICE_INACTIVE_TITLE'] = '디바이스 응답 없음';
            LanguageSet['OPERATION_FAIL_TITLE'] = '제어 실패';

            LanguageSet['DEVICE_EDIT'] = '편집';
            LanguageSet['INFORMATION'] = "정보";
            LanguageSet['STATISTICS'] = "통계";
            LanguageSet['CONTROLLER_VERSION'] = '컨트롤러 버전';
            LanguageSet['OPEN_SOURCE_LICENSE'] = '오픈소스 라이선스';

            LanguageSet['ACTIVITY_LOG_HISTORY'] = '활동 기록';
            LanguageSet['ACTIVITY_LOG_TODAY'] = '오늘';
            LanguageSet['ACTIVITY_LOG_MORE'] = '더보기';
            LanguageSet['ACTIVITY_NO_ACTIVITY'] = '실행 내역이 없어요';

            LanguageSet['INFORMATION_CARD_TITLE'] = "사용 정보";
            LanguageSet['BIXBY_CARD_TITLE'] = "빅스비 사용하기";
            LanguageSet['WARNING'] = '주의';
            LanguageSet['CURRENT'] = '현재';

            LanguageSet['GRAPH_BUTTON_MINUTE'] = '분';
            LanguageSet['GRAPH_BUTTON_HOUR'] = '시';
            LanguageSet['GRAPH_BUTTON_DAY'] = '일';
            LanguageSet['GRAPH_LABEL_NOW'] ='지금';

            /* ### for Each Device ### */
            LanguageSet['ON'] = '켜짐';
            LanguageSet['OFF'] = '꺼짐';
            // Integrated Switch
            LanguageSet['INTEGRATED_SWITCH_NAME'] = '일괄소등스위치';
            LanguageSet['INTEGRATED_SWITCH_ON'] = '켜짐';
            LanguageSet['INTEGRATED_SWITCH_OFF'] = '꺼짐';
            LanguageSet['INTEGRATED_SWITCH_INFORMATION'] = '일괄소등스위치는 연결된 빌트인 스위치 전체를 켜거나 끌 수 있습니다. 연결된 각각의 스위치는 각각의 켜짐/꺼짐 상태를 가지고 있습니다. 개별 스위치가 꺼져 있으면 일괄소등스위치로 조작 할 수 없습니다.';
            LanguageSet['GROUPED_DEVICE_CARD_TITLE'] = '그룹 디바이스';
            LanguageSet['BUILT_IN_LIGHT'] = '빌트인 조명';
            LanguageSet['INTEGRATED_SWITCH_BIXBY'] = '\"하이 빅스비, 일괄소등스위치 켜줘.\"';
            // Light
            LanguageSet['LIGHT_NAME'] = "조명";
            LanguageSet['DIMMER_LEVEL'] = '%s 단계';
            LanguageSet['LIGHT_BIXBY'] = '\"하이 빅스비, 조명 켜줘.\"';
            // Thermostat
            LanguageSet['THERMOSTAT_NAME'] = '난방';
            LanguageSet['THERMOSTAT_MODE'] = '모드';
            LanguageSet['THERMOSTAT_BIXBY'] = '\"하이 빅스비, 온도조절장치 난방온도 21도로 설정해줘.\"';
            LanguageSet['SET_TO'] = '희망 온도';
            LanguageSet['SET_TEMPERATURE'] = '온도 설정';
            LanguageSet['CURRENT_TEMPERATURE'] = "현재 온도";
            LanguageSet['OUTING_LABEL'] = '외출';
            // + System Airconditioner
            LanguageSet['AIRCONDITIONER_NAME'] = '시스템 에어컨';
            LanguageSet['FAN_SPEED'] = '풍속';
            LanguageSet['FAN_OSCILLATION'] = '풍향';
            LanguageSet['AIRCONDITIONER_BIXBY'] = '\"하이 빅스비, 에어컨 켜줘.\"';
            // Gas Valve
            LanguageSet['GASVALVE_NAME'] = "가스밸브";
            LanguageSet['GASVALVE_WARN_MESSAGE_CLOSE_ONLY'] = '안전을 위해 원격으로는 밸브를 닫을 수만 있어요.<br>제어 후 가스 밸브가 닫혀 있는지 반드시 확인하세요.';
            LanguageSet['GASVALVE_WARN_MESSAGE_NO_CONTROL'] = '가스밸브의 열림, 닫힘에 대한<br>현재 상태 확인이 가능합니다.';
            LanguageSet['GASVALVE_CONTROL_DENY'] = '가스밸브의 열림/닫힘 상태의 정보의 확인만 가능해요.';
            LanguageSet['GASVALVE_OPERATION_FAIL'] = '가스 밸브가 닫히지 않았어요.';
            LanguageSet['GASVALVE_OPEN'] = '열림';
            LanguageSet['GASVALVE_CLOSE'] = '닫힘';
            LanguageSet['GASVALVE_BIXBY'] = '\"하이 빅스비, 가스밸브 잠궈줘.\"';
            LanguageSet['GASVALVE_BIXBY_NO_CONTROL'] = '\"하이 빅스비, 가스밸브 상태 확인해줘.\"';
            LanguageSet['___PO_CODE_VALVE_OPEN'] = '열기';
            LanguageSet['___PO_CODE_VALVE_CLOSED'] = '닫기';
            // Window Shade
            LanguageSet['WINDOWSHADE_NAME'] = '커튼';
            LanguageSet['WINDOWSHADE_BIXBY'] = '\"하이 빅스비, 커튼 열어 줘.\"';
            LanguageSet['WINDOWSHADE_BIXBY_BLIND'] = '\"하이 빅스비, 블라인드 열어줘.\"';
            // Elevator
            LanguageSet['ELEVATOR_NAME'] = '엘리베이터';
            LanguageSet['ELEVATOR_READY'] = '엘리베이터 대기';
            LanguageSet['ELEVATOR_INFORMATION'] = "엘리베이터 호출시 거주하고 계신층에서 출발하여 아래층으로 향하는 엘리베이터의 사용예약이 가능합니다.<br>엘리베이터 탑승 후 엘리베이터 안에서 이동하는 층을 선택 할 수 있습니다."
            LanguageSet['ELEVATOR_BIXBY'] = '\"하이 빅스비, 엘리베이터 호출해줘.\"';
            LanguageSet['___PO_CODE_ELEVATOR_BUTTON'] = '엘리베이터 버튼';
            LanguageSet['ELEVATOR_CONNECTION_ERROR'] = '지금은 엘리베이터를 호출 할 수 없어요.<br>잠시 후 다시 시도해주세요.';
            // Vent
            LanguageSet['VENTILATION_NAME'] = '환기';
            LanguageSet['VENT_BIXBY'] = '\"하이 빅스비, 환기 켜줘.\"';
            // Smart Lock
            LanguageSet['SMARTLOCK_NAME'] = "문 잠금장치";
            LanguageSet['SMARTLOCK_WARN_TOAST_MESSAGE'] = '잠금은 지원하지 않습니다.'
            LanguageSet['SMARTLOCK_UNLOCK_CONFIRMAITON_MESSAGE'] = "확인 버튼을 누르면 잠금이 해제됩니다.";
            LanguageSet['SMARTLOCK_UNLOCK_INFO_TOAST_MESSAGE'] = "문은 자동으로 잠깁니다.";
            LanguageSet['SMARTLOCK_UNLOCK'] = '잠금 해제됨';
            LanguageSet['SMARTLOCK_LOCK'] = '잠김';
            LanguageSet['SMARTLOCK_UNLOCK_TITLE'] = '잠금 해제';
            LanguageSet['SMARTLOCK_BIXBY'] = '\"하이 빅스비, 도어락 상태 알려줘.\"';
            // SmartPlug
            LanguageSet['SMARTPLUG_NAME'] = '대기전력차단기';
            LanguageSet['SMARTPLUG_POWER_METER'] = "전력량";
            LanguageSet['SMARTPLUG_AUTOSHOT_TITLE'] = '대기전력 자동 차단';
            LanguageSet['SMARTPLUG_AUTOSHOT_INFORMATION'] = '설정 값보다 작은 값이 일정 시간 동안 지속되면 전원이 자동으로 꺼져요.';
            LanguageSet['SET_THRESHOLD'] = '대기전력 허용 한계값';
            LanguageSet['SMARTPLUG_BIXBY'] = '\"하이 빅스비, 전원플러그 켜 줘.\"';
            // FIXME: VideoIntercom
            LanguageSet['VIDEOINTERCOM_NAME'] = "도어벨";
            LanguageSet['VIDEOINTERCOM_SECURITYGATE'] = "세대 출입문";
            LanguageSet['VIDEOINTERCOM_DOOR_OPEN'] = "열림";
            LanguageSet['VIDEOINTERCOM_DOOR_CLOSE'] = "닫힘";
            LanguageSet['VIDEOINTERCOM_SECURITY'] = "경비실";
            LanguageSet['VIDEOINTERCOM_LOBBY'] = "로비";
            LanguageSet['VIDEOINTERCOM_FRONTDOOR'] = "현관문";
            LanguageSet['VIDEOINTERCOM_CONNECTED'] = "연결됨";
            LanguageSet['VIDEOINTERCOM_DISCONNECTED'] = "연결 종료";
            LanguageSet['VIDEOINTERCOM_LOADING'] = "통화 상태를 확인하고 있습니다...";
            LanguageSet['VIDEOINTERCOM_CALLINGMSG_PRE'] = "";
            LanguageSet['VIDEOINTERCOM_CALLINGMSG_POST'] = "로부터 전화가 왔습니다";
            LanguageSet['VIDEOINTERCOM_CONNECTMSG_PRE'] = "";
            LanguageSet['VIDEOINTERCOM_CONNECTMSG_POST'] = "하고 연결됨";
            LanguageSet['VIDEOINTERCOM_OFFERMSG_PRE'] = "";
            LanguageSet['VIDEOINTERCOM_OFFERMSG_POST'] = " 연결중";
            LanguageSet['VIDEOINTERCOM_ANSWERMSG_PRE'] = "";
            LanguageSet['VIDEOINTERCOM_ANSWERMSG_POST'] = "로부터 요청";
            LanguageSet['VIDEOINTERCOM_OPEN_THE_DOOR'] = "문이 열렸습니다.";
            //CS
            LanguageSet['CS_CARD_DESCRIPTION'] = "아파트에 연결된 %s 홈 네트웍 기기입니다.<br> 오류시 %s 고객센터(%s)로 연락하세요";

            //Voice Assistant
            LanguageSet['VA_POWER_SWITCH_NAME'] = "전원";
            LanguageSet['___PO_CODE_NAVIGATE_UP'] = '상위 메뉴로 이동';
            LanguageSet['___PO_CODE_MORE_OPTIONS'] = '옵션 더보기';
            LanguageSet['VA_COLOR_TEMP_LEVEL'] = '레벨 ';
            LanguageSet['VA_BIXBY_ICON_LABEL'] = "빅스비 아이콘";
            LanguageSet['VA_CAUTION_ICON_LABEL'] = "경고 아이콘";
            LanguageSet['VA_ELEVATOR_CALL_BUTTON'] = '엘리베이터 호출';
            LanguageSet['VA_GRAPH_LABEL'] = '그래프';
            LanguageSet['VA_DOCUMENT_TITLE'] = '홈넷 디바이스 상세화면';

            //Automation
            LanguageSet['automation_timer_example_text'] = "예: 1시간 후에 켜기 또는 끄기";
            LanguageSet['automation_example_text'] = "예: 매일 오후 6:00";
            LanguageSet['automation_example_text2'] = "예: 주중 오후 10:00";
            LanguageSet['automation_timer'] = "타이머";
            LanguageSet['automation_power_on'] = "전원 켜기";
            LanguageSet['automation_power_off'] = "전원 끄기";

            LanguageSet['automation_after_pd_minutes'] = "%d분 후";
            LanguageSet['automation_after_pd_hour'] = "N/A";
            LanguageSet['automation_custom'] = "직접 설정";
            LanguageSet['automation_repeat'] = "반복";
            LanguageSet['automation_every_day'] = "매일";
            LanguageSet['automation_weekdays'] = "주중";
            LanguageSet['automation_weekends'] = "주말";
            LanguageSet['automation_sunday_full'] = "일요일";
            LanguageSet['automation_monday_full'] = "월요일";
            LanguageSet['automation_tuesday_full'] = "화요일";
            LanguageSet['automation_wednesday_full'] = "수요일";
            LanguageSet['automation_thursday_full'] = "목요일";
            LanguageSet['automation_friday_full'] = "금요일";
            LanguageSet['automation_saturday_full'] = "토요일";
            LanguageSet['automation_sunday'] = "일";
            LanguageSet['automation_monday'] = "월";
            LanguageSet['automation_tuesday'] = "화";
            LanguageSet['automation_wednesday'] = "수";
            LanguageSet['automation_thursday'] = "목";
            LanguageSet['automation_friday'] = "금";
            LanguageSet['automation_saturday'] = "토";
            LanguageSet['automation_once'] = "한 번";
            LanguageSet['automation_am'] = "오전";
            LanguageSet['automation_pm'] = "오후";

            //activity history
            LanguageSet['replace_keyword_dimmer'] = "대기";

            break;
        case 'en_US':
        default:
            /* ### for Common Device Plugin ### */
            LanguageSet['LOADING'] = "Loading\u2026";
            LanguageSet['PROCESSING'] = "Processing";
            LanguageSet['DIALOG_BUTTON_OK'] = "OK";
            LanguageSet['DIALOG_BUTTON_DONE'] = "Done";
            LanguageSet['DIALOG_BUTTON_CANCEL'] = "Cancel";

            LanguageSet['VENDOR_CONTACT'] = "Contact";

            LanguageSet['NETWORK_ERROR_TITLE'] = "No network connection";
            LanguageSet['NETWORK_ERROR_MESSAGE'] = "Couldn't connect. Try again.";
            LanguageSet['MOBILE_NETWORK_DISCONNECTED'] = "No network connection. Connect to a network and try again.";
            LanguageSet['NETWORK_DISCONNECTED_TITLE'] = "Network Disconnected";
            LanguageSet['NETWORK_DISCONNECTED_MESSAGE'] = "Check to see if the Network is active and is operating normally. If the Network is activated, try updating this plugin page again.";
            LanguageSet['DEVICE_DISCONNECTED_TITLE'] = 'Device Disconnected';
            LanguageSet['DEVICE_DISCONNECTED_MESSAGE'] = 'Check to see if the device is active in the wallpad and is operating normally. If the device is still disconnected, try adding the device to SmartThings again.';
            LanguageSet['DEVICE_INACTIVE_MESSAGE'] = 'Information for %s isn\'t up to date.';
            LanguageSet['DEVICE_INACTIVE_TITLE'] = 'Device not responding';
            LanguageSet['OPERATION_FAIL_TITLE'] = 'Operation failed';

            LanguageSet['DEVICE_EDIT'] = 'Edit';
            LanguageSet['INFORMATION'] = "Information";
            LanguageSet['STATISTICS'] = "Statistics";
            LanguageSet['CONTROLLER_VERSION'] = 'Controller version';
            LanguageSet['OPEN_SOURCE_LICENSE'] = 'Open Source License';

            LanguageSet['ACTIVITY_LOG_HISTORY'] = 'Activity history';
            LanguageSet['ACTIVITY_LOG_TODAY'] = 'Today';
            LanguageSet['ACTIVITY_LOG_MORE'] = 'More';
            LanguageSet['ACTIVITY_NO_ACTIVITY'] = 'No activity';

            LanguageSet['INFORMATION_CARD_TITLE'] = "Information";
            LanguageSet['BIXBY_CARD_TITLE'] = "Using Bixby";
            LanguageSet['WARNING'] = 'Warning';
            LanguageSet['CURRENT'] = 'Current';

            LanguageSet['GRAPH_BUTTON_MINUTE'] = 'Minute';
            LanguageSet['GRAPH_BUTTON_HOUR'] = 'Hour';
            LanguageSet['GRAPH_BUTTON_DAY'] = 'Day';
            LanguageSet['GRAPH_LABEL_NOW'] ='Now';

            /* ### for Each Device ### */
            LanguageSet['ON'] = 'On';
            LanguageSet['OFF'] = 'Off';
            // Integrated Switch
            LanguageSet['INTEGRATED_SWITCH_NAME'] = 'Integrated Switch';
            LanguageSet['INTEGRATED_SWITCH_ON'] = 'ON';
            LanguageSet['INTEGRATED_SWITCH_OFF'] = 'OFF';
            LanguageSet['INTEGRATED_SWITCH_INFORMATION'] = "The integrated switch turns on or off all of the devices that are connected to it.<br> Keep in mind that the added devices have their own power settings. If a device is separately powered off, the integrated switch may not be able to turn it on.";
            LanguageSet['GROUPED_DEVICE_CARD_TITLE'] = 'Grouped Devices';
            LanguageSet['BUILT_IN_LIGHT'] = 'built-in light';
            LanguageSet['INTEGRATED_SWITCH_BIXBY'] = '\"Hi Bixby, Turn on the switch.\"';
            // Light
            LanguageSet['LIGHT_NAME'] = "Light";
            LanguageSet['DIMMER_LEVEL'] = 'LEVEL %s';
            LanguageSet['LIGHT_BIXBY'] = '\"Hi Bixby, Turn On the light.\"';
            // Thermostat
            LanguageSet['THERMOSTAT_NAME'] = 'Thermostat';
            LanguageSet['THERMOSTAT_MODE'] = 'Mode';
            LanguageSet['THERMOSTAT_BIXBY'] = '\"Hi Bixby, Set the thermostat heating to 21 degrees.\"';
            LanguageSet['SET_TO'] = 'Set to';
            LanguageSet['SET_TEMPERATURE'] = 'Set temperature';
            LanguageSet['CURRENT_TEMPERATURE'] = "Current temperature";
            LanguageSet['OUTING_LABEL'] = 'Off';
            // + System Airconditioner
            LanguageSet['AIRCONDITIONER_NAME'] = 'System Airconditoiner';
            LanguageSet['FAN_SPEED'] = 'Fan speed';
            LanguageSet['FAN_OSCILLATION'] = 'Wind direction';
            LanguageSet['AIRCONDITIONER_BIXBY'] = '\"Hi Bixby, Turn on the air conditioner.\"';
            // Gas Valve
            LanguageSet['GASVALVE_NAME'] = "Gas Valve";
            LanguageSet['GASVALVE_WARN_MESSAGE_CLOSE_ONLY'] = 'For your safety, you can only close the valve remotely, not open it.<br>After control, make sure the gas valve is closed.';
            LanguageSet['GASVALVE_WARN_MESSAGE_NO_CONTROL'] = 'You can check the current open/close status information for the gas valve.';
            LanguageSet['GASVALVE_CONTROL_DENY'] = 'No able to change';
            LanguageSet['GASVALVE_OPERATION_FAIL'] = 'Gas valve is not closed.';
            LanguageSet['GASVALVE_OPEN'] = 'Open';
            LanguageSet['GASVALVE_CLOSE'] = 'Close';
            LanguageSet['GASVALVE_BIXBY'] = '\"Hi Bixby, Close the gas valve.\"';
            LanguageSet['GASVALVE_BIXBY_NO_CONTROL'] = '\"Hi Bixby, Check the status of the gas valve.\"';
            LanguageSet['___PO_CODE_VALVE_OPEN'] = 'Open';
            LanguageSet['___PO_CODE_VALVE_CLOSED'] = 'Closed';
            // Window Shade
            LanguageSet['WINDOWSHADE_NAME'] = 'Window Shade';
            LanguageSet['WINDOWSHADE_BIXBY'] = '\"Hi Bixby, Open the curtain.\"';
            LanguageSet['WINDOWSHADE_BIXBY_BLIND'] = '\"Hi Bixby, Open the blind.\"';
            // Elevator
            LanguageSet['ELEVATOR_NAME'] = 'Elevator';
            LanguageSet['ELEVATOR_READY'] = 'Elevator Ready';
            LanguageSet['ELEVATOR_INFORMATION'] = "You can call the elevator to reserve it and then use it to move from your current floor to a lower floor.<br>After you take the elevator, you can choose the floor you want to go to."
            LanguageSet['ELEVATOR_BIXBY'] = '\"Hi Bixby, Call the elevator.\"';
            LanguageSet['___PO_CODE_ELEVATOR_BUTTON'] = 'Elevator Button';
            LanguageSet['ELEVATOR_CONNECTION_ERROR'] = 'There is a problem connecting to elevator.<br>Try again later.';
            // Vent
            LanguageSet['VENTILATION_NAME'] = 'Ventilation';
            LanguageSet['VENT_BIXBY'] = '\"Hi Bixby, Turn on the vent.\"';
            // Smart Lock
            LanguageSet['SMARTLOCK_NAME'] = "Door Lock";
            LanguageSet['SMARTLOCK_WARN_TOAST_MESSAGE'] = "Can't lock the door";
            LanguageSet['SMARTLOCK_UNLOCK_CONFIRMAITON_MESSAGE'] = "Press OK to unlock the door.";
            LanguageSet['SMARTLOCK_UNLOCK_INFO_TOAST_MESSAGE'] = "Door is locked automatically.";
            LanguageSet['SMARTLOCK_UNLOCK'] = 'Unlocked';
            LanguageSet['SMARTLOCK_LOCK'] = 'Locked';
            LanguageSet['SMARTLOCK_UNLOCK_TITLE'] = 'Unlock';
            LanguageSet['SMARTLOCK_BIXBY'] = '\"Hi Bixby, Check the lock status of the doorlock.\"';
            // SmartPlug
            LanguageSet['SMARTPLUG_NAME'] = 'Smart Plug';
            LanguageSet['SMARTPLUG_POWER_METER'] = "Power meter";
            LanguageSet['SMARTPLUG_AUTOSHOT_TITLE'] = 'Standby power Auto control';
            LanguageSet['SMARTPLUG_AUTOSHOT_INFORMATION'] = 'If a value less than the set value lasts for a certain period of time, the power is automatically turned off.';
            LanguageSet['SET_THRESHOLD'] = 'Standby power threshold';
            LanguageSet['SMARTPLUG_BIXBY'] = '\"Hi Bixby, Turn on the outlet.\"';
            // FIXME: VideoIntercom
            LanguageSet['VIDEOINTERCOM_NAME'] = "Video Intercom";
            LanguageSet['VIDEOINTERCOM_SECURITYGATE'] = "Security Gate";
            LanguageSet['VIDEOINTERCOM_DOOR_OPEN'] = "Open";
            LanguageSet['VIDEOINTERCOM_DOOR_CLOSE'] = "Close";
            LanguageSet['VIDEOINTERCOM_SECURITY'] = "Security";
            LanguageSet['VIDEOINTERCOM_LOBBY'] = "Lobby";
            LanguageSet['VIDEOINTERCOM_FRONTDOOR'] = "Front Door";
            LanguageSet['VIDEOINTERCOM_CONNECTED'] = "Connected";
            LanguageSet['VIDEOINTERCOM_DISCONNECTED'] = "Disconnected";
            LanguageSet['VIDEOINTERCOM_LOADING'] = "Checking Call Status...";
            LanguageSet['VIDEOINTERCOM_CALLINGMSG_PRE'] = "Connect To ";
            LanguageSet['VIDEOINTERCOM_CALLINGMSG_POST'] = "";
            LanguageSet['VIDEOINTERCOM_CONNECTMSG_PRE'] = "Connected with ";
            LanguageSet['VIDEOINTERCOM_CONNECTMSG_POST'] = "";
            LanguageSet['VIDEOINTERCOM_OFFERMSG_PRE'] = "Call to ";
            LanguageSet['VIDEOINTERCOM_OFFERMSG_POST'] = "";
            LanguageSet['VIDEOINTERCOM_ANSWERMSG_PRE'] = "Call From ";
            LanguageSet['VIDEOINTERCOM_ANSWERMSG_POST'] = "";
            LanguageSet['VIDEOINTERCOM_OPEN_THE_DOOR'] = "Door is Open now.";
            //CS
            LanguageSet['CS_CARD_DESCRIPTION'] = "%s provides the services to help you control the above device.<br> If you experience any issues, please contact %s Customer Center directly at %s.";

            //Voice Assistant
            LanguageSet['VA_POWER_SWITCH_NAME'] = "Power";
            LanguageSet['___PO_CODE_NAVIGATE_UP'] = 'Navigate up';
            LanguageSet['___PO_CODE_MORE_OPTIONS'] = 'More options';
            LanguageSet['VA_COLOR_TEMP_LEVEL'] = 'Level ';
            LanguageSet['VA_BIXBY_ICON_LABEL'] = "Bixby Icon";
            LanguageSet['VA_ELEVATOR_CALL_BUTTON'] = 'Elevator Call';
            LanguageSet['VA_GRAPH_LABEL'] = 'Graph';
            LanguageSet['VA_DOCUMENT_TITLE'] = 'Home Net Device Detail Screen';

            //Automation
            LanguageSet['automation_timer_example_text'] = "Example: After 1 hour turn on or off";
            LanguageSet['automation_example_text'] = "Example: Every day, 6:00 PM";
            LanguageSet['automation_example_text2'] = "Example: Weekdays, 10:00 PM";
            LanguageSet['automation_timer'] = "Timer";
            LanguageSet['automation_power_on'] = "Power on";
            LanguageSet['automation_power_off'] = "Power off";

            LanguageSet['automation_after_pd_minutes'] = "After %d minutes";
            LanguageSet['automation_after_pd_hour'] = "After %d hour";
            LanguageSet['automation_custom'] = "Custom";
            LanguageSet['automation_repeat'] = "Repeat";
            LanguageSet['automation_every_day'] = "Every day";
            LanguageSet['automation_weekdays'] = "Weekdays";
            LanguageSet['automation_weekends'] = "Weekends";
            LanguageSet['automation_sunday_full'] = "Sunday";
            LanguageSet['automation_monday_full'] = "Monday";
            LanguageSet['automation_tuesday_full'] = "Tuesday";
            LanguageSet['automation_wednesday_full'] = "Wednesday";
            LanguageSet['automation_thursday_full'] = "Thursday";
            LanguageSet['automation_friday_full'] = "Friday";
            LanguageSet['automation_saturday_full'] = "Saturday";
            LanguageSet['automation_sunday'] = "S";
            LanguageSet['automation_monday'] = "M";
            LanguageSet['automation_tuesday'] = "T";
            LanguageSet['automation_wednesday'] = "W";
            LanguageSet['automation_thursday'] = "T";
            LanguageSet['automation_friday'] = "F";
            LanguageSet['automation_saturday'] = "S";
            LanguageSet['automation_once'] = "Once";
            LanguageSet['automation_am'] = "AM";
            LanguageSet['automation_pm'] = "PM";

            //activity history
            LanguageSet['replace_keyword_dimmer'] = "dimmer";
        break;
    }
}
