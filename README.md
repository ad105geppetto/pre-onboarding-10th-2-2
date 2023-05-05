![header](https://capsule-render.vercel.app/api?type=Rounded&color=auto&height=150&section=header&text=wanted-pre-onboarding-frontend&fontSize=40)

## 과제 설명

```
원티드 프리온보딩 프론트엔드 인턴십 Week 2. 기업 과제
원티드 프리온보딩 프론트엔드 기업 과제를 각자 개발한 후 문제 해결이나 기술을 논의
이후 동료학습을 통해 Best Pratice을 만들어 제출.
```

## 배포

[https://main--melodic-treacle-a0f760.netlify.app/](https://main--melodic-treacle-a0f760.netlify.app/)

## 사용 기술

- Typescript
- Axios
- Styled Components

## 파일 구조

```bash
📦src
 ┣ 📂api
 ┃ ┗ 📜fetchSearchSuggestions.tsx
 ┣ 📂components
 ┃ ┣ 📂common
 ┃ ┃ ┗ 📜SearchIcon.tsx
 ┃ ┗ 📂search
 ┃ ┃ ┣ 📂autoComplete
 ┃ ┃ ┃ ┣ 📜autoComplete.styles.ts
 ┃ ┃ ┃ ┣ 📜autoComplete.types.ts
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂searchHistory
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┣ 📜searchHistory.styles.ts
 ┃ ┃ ┃ ┗ 📜searchHistory.types.ts
 ┃ ┃ ┣ 📂searchbar
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┣ 📜searchbar.styles.ts
 ┃ ┃ ┃ ┗ 📜searchbar.types.ts
 ┃ ┃ ┣ 📂suggestedSearchGroup
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜suggestedSearchGroup.styles.ts
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┣ 📜search.styles.ts
 ┃ ┃ ┗ 📜search.types.ts
 ┣ 📂constant
 ┃ ┗ 📜index.ts
 ┣ 📂lib
 ┃ ┗ 📜customAxios.ts
 ┣ 📂utils
 ┃ ┣ 📜index.ts
 ┃ ┗ 📜utils.types.ts
 ┣ 📜App.styles.ts
 ┣ 📜App.tsx
 ┣ 📜globalStyle.ts
 ┗ 📜index.tsx
```

## ⭐️ Best Practice 선정 과정

**💡 캐싱 관련 논의**
- 세션 스토리지, 로컬 스토리지, 캐시 스토리지가 후보로 제안됨.
  - 클론 사이트에서도 세션 스토리지를 사용.
  - keyword와 list는 세션 스토리지에 저장, 만료일자는 캐시 스토리지에서 관리하는 방법을 채택.
  - API 요청 이전에 캐싱된 값이 있는지, 만료일자가 지나지 않았는지 확인 후 작업.
  - expire time은 60000ms로 설정.

**💡 키보드 액션**
- 대부분의 팀원이 방향키(ArrowDown, ArrowUp)으로 검색어 이동이 가능하게 구현.
- 웹 접근성을 위해서 Tab키로 키보드 액션이 가능하도록 만드는 것 고려.
  - 리스트 Item을 텍스트 태그가 아닌 button으로 하여 Tab이 가능하도록 구현.

**💡 디바운싱 관련 논의**
- 모든 팀원이 setTimeout을 사용하여 디바운싱 구현.
- 디바운싱 관련 코드는 custom hook으로 분리하여 처리하기로 결정.
  - 지연 시간은 300ms과 500ms중 300ms로 선택.

**💡 검색어와 같은 부분 강조처리**
- 클론 사이트에서의 추천 검색어 목록을 보면 현재 입력중인 검색어와 같은 부분은 Bold 처리되어 보여짐.
  - 클론 사이트의 UI를 선택하여 강조하기로 결정.
  - 한글, 영어 대/소문자 모두 반영할 수 있도록 구현.

**💡 검색어, 검색 버튼 클릭 후 처리 논의**
- 클론 사이트에서는 버튼 클릭 후 해당 검색어 페이지로 이동하지만, 과제 구현 요구사항에는 없음.
- 요구사항에 초점을 맞춰 이동하지 않고 해당 검색어를 클릭했다는 표시만 남기기로 결정.
  - input 태그에 값을 채워넣는 방식을 선택.

**💡 추천 검색어 개수 제한**
- 클론 사이트와 같이 받아온 목록에서 상위 7개만 나타나도록 제한.

**💡 SVG ICON 관련 논의**
- styled-components에 내장된 라이브러리를 설치해 아이콘을 불러오는 방법과 SVG 이미지를 사용하는 방법을 논의.
  - 별도의 라이브러리 설치없이 SVG 이미지를 컴포넌트화해서 사용하기로 결정.

**💡 axios instance 사용 논의**
- 이번 과제에서는 사용할 필요성을 크게 못느꼈지만, 팀 내 코드 규격화 및 앞으로의 확장성을 위해서 사용하기로 결정.

**💡 리팩토링 관련 논의**
- 체크리스트를 만들어 모든 팀원이 각자 모든 항목을 리팩토링하는 방법을 채택.
- 위의 Best Practice 논의를 반영해 체크리스트 제작 후 리팩토링.
  - 키보드 조작 시 배경색 변경
  - 키보드 조작에 따라 input과 현재 입력중인 검색어는 변경하지 않도록 변경.
  - input의 value를 state로 관리하지 않고 ref로 참조할 수 있도록 변경.
  - 추천 검색어 위의 텍스트가 변경되지 않고 focus도 되지 않도록 변경.
  - 검색 컴포넌트 이외의 영역 클릭시 닫히도록 변경.
  

**💡 그 외 좋은 의견**
- MVC 패턴을 적용하여 View단과 hook단을 나누는 것에 대해 논의.
  - Best로 선정된 코드 구조가 코드간 의존성이 높아 패턴을 적용하는 것이 쉽지 않아보여 적용하지 않기로 결정.


## 협업 방식

### 소통 및 회의

- Slack
- Notion
- Google Meet

### 커밋 컨벤션

```
init : 초기화
feat : 새로운 기능 추가
update: 기능 수정
fix : 버그 수정
docs : 문서 수정
style : 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우, linting
design: 레이아웃 수정, UX 또는 UI에 대한 커밋
refactor : 코드 리팩터링
test : 테스트 코드, 리팩터링 테스트 코드 추가
chore : 빌드 업무 수정, 패키지 매니저 수정, 그 외 자잘한 수정에 대한 커밋
```

### 역할 분담

모든 팀원이 전체 개발, 리팩토링에 참여했으며 다수의 전체 회의을 통해 Best Practice를 선정
- 초기 환경설정: 한소정
- (지난주 초기 환경설정): 이승재
- README: 황예진
- 배포: 이승재

## 실행 방법

```shell
git clone https://github.com/PreOnboarding-2/pre-onboarding-10th-2-2.git
cd pre-onboarding-10th-2-2
npm install
npm start
```
