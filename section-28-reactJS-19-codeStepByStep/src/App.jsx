import { useState } from 'react';
import Navigation from './components/Navigation';
import SectionTemplate from './components/SectionTemplate';
import { SECTIONS_DATA } from './utils/navigation';
import './styles/global.css';
import './styles/sections.css';

// Import Example components
import WhatiscomponentExample from './sections/01-Basics/01-WhatIsComponent/Example';
import ImportingexportingcomponentsExample from './sections/01-Basics/02-ImportingExportingComponents/Example';
import JsxbasicsExample from './sections/01-Basics/03-JSXBasics/Example';
import JsxwithcurlybracesExample from './sections/01-Basics/04-JSXWithCurlyBraces/Example';
import ClickeventandfunctioncallExample from './sections/01-Basics/05-ClickEventAndFunctionCall/Example';
import HowtoupgradereactversionExample from './sections/01-Basics/06-HowToUpgradeReactVersion/Example';
import WhatisstateExample from './sections/01-Basics/07-WhatIsState/Example';
import TogglehtmlelementExample from './sections/01-Basics/08-ToggleHTMLElement/Example';
import ConditionalrenderingExample from './sections/02-PropsAndConditionalRendering/01-ConditionalRendering/Example';
import WhatarepropsExample from './sections/02-PropsAndConditionalRendering/02-WhatAreProps/Example';
import PropsadvancedExample from './sections/02-PropsAndConditionalRendering/03-PropsAdvanced/Example';
import PassfunctionaspropsExample from './sections/02-PropsAndConditionalRendering/04-PassFunctionAsProps/Example';
import UncontrolledcomponentExample from './sections/02-PropsAndConditionalRendering/05-UncontrolledComponent/Example';
import DerivedstateExample from './sections/02-PropsAndConditionalRendering/06-DerivedState/Example';
import UsestatehookExample from './sections/03-HooksAndState/01-UseStateHook/Example';
import UseeffecthookExample from './sections/03-HooksAndState/02-UseEffectHook/Example';
import UseeffectforlifecycleExample from './sections/03-HooksAndState/03-UseEffectForLifecycle/Example';
import UserefhookExample from './sections/03-HooksAndState/04-UseRefHook/Example';
import UsecontextapiExample from './sections/03-HooksAndState/05-UseContextAPI/Example';
import UsereducerhookExample from './sections/03-HooksAndState/06-UseReducerHook/Example';
import UsecallbackhookExample from './sections/03-HooksAndState/07-UseCallbackHook/Example';
import UsememohookExample from './sections/03-HooksAndState/08-UseMemoHook/Example';
import UsetransitionhookExample from './sections/03-HooksAndState/09-UseTransitionHook/Example';
import UsedeferredvaluehookExample from './sections/03-HooksAndState/10-UseDeferredValueHook/Example';
import UseidhookExample from './sections/03-HooksAndState/11-UseIdHook/Example';
import MakecustomhooksExample from './sections/03-HooksAndState/12-MakeCustomHooks/Example';
import InlinestylesExample from './sections/04-Styling/01-InlineStyles/Example';
import DynamicandconditionalstylesExample from './sections/04-Styling/02-DynamicAndConditionalStyles/Example';
import ExternalstylesExample from './sections/04-Styling/03-ExternalStyles/Example';
import CssmodulesExample from './sections/04-Styling/04-CSSModules/Example';
import StyledcomponentsExample from './sections/04-Styling/05-StyledComponents/Example';
import InstalltailwindcssExample from './sections/04-Styling/06-InstallTailwindCSS/Example';
import HandlecheckboxesExample from './sections/05-FormsAndValidation/01-HandleCheckboxes/Example';
import HandleradioanddropdownExample from './sections/05-FormsAndValidation/02-HandleRadioAndDropdown/Example';
import LoopwithmapfunctionExample from './sections/05-FormsAndValidation/03-LoopWithMapFunction/Example';
import ReusecomponentinloopExample from './sections/05-FormsAndValidation/04-ReuseComponentInLoop/Example';
import SimplevalidationExample from './sections/05-FormsAndValidation/05-SimpleValidation/Example';
import ValidationwithuseactionstateExample from './sections/05-FormsAndValidation/06-ValidationWithUseActionState/Example';
import LazyloadingExample from './sections/05-FormsAndValidation/07-LazyLoading/Example';
import AdvancedvalidationExample from './sections/05-FormsAndValidation/08-AdvancedValidation/Example';
import GetdatafromgetapiExample from './sections/06-APIIntegration/01-GetDataFromGETAPI/Example';
import SetupjsonserverExample from './sections/06-APIIntegration/02-SetupJSONServer/Example';
import PostmethodintegrationExample from './sections/06-APIIntegration/03-PostMethodIntegration/Example';
import DeletemethodintegrationExample from './sections/06-APIIntegration/04-DeleteMethodIntegration/Example';
import UpdatemethodintegrationExample from './sections/06-APIIntegration/05-UpdateMethodIntegration/Example';
import PopulatedataininputfieldsExample from './sections/06-APIIntegration/06-PopulateDataInInputFields/Example';
import EdituserdetailpageExample from './sections/06-APIIntegration/07-EditUserDetailPage/Example';
import AdduseranduserlistroutesExample from './sections/06-APIIntegration/08-AddUserAndUserListRoutes/Example';
import WhatisreactrouterExample from './sections/07-ReactRouter/01-WhatIsReactRouter/Example';
import BasicexampleofrouterExample from './sections/07-ReactRouter/02-BasicExampleOfRouter/Example';
import HeaderwithreactrouterExample from './sections/07-ReactRouter/03-HeaderWithReactRouter/Example';
import PageNotFoundExample from './sections/07-ReactRouter/04-404PageAndRedirect/Example';
import NestednavigationwithrouterExample from './sections/07-ReactRouter/05-NestedNavigationWithRouter/Example';
import LayoutandindexroutesExample from './sections/07-ReactRouter/06-LayoutAndIndexRoutes/Example';
import RouteprefixesExample from './sections/07-ReactRouter/07-RoutePrefixes/Example';
import DynamicrouteswithuseparamsExample from './sections/07-ReactRouter/08-DynamicRoutesWithUseParams/Example';
import ReactjsfragmentExample from './sections/08-AdvancedConcepts/01-ReactJSFragment/Example';
import PurecomponentExample from './sections/08-AdvancedConcepts/02-PureComponent/Example';
import Contextapiinreact19Example from './sections/08-AdvancedConcepts/03-ContextAPIInReact19/Example';
import React19useeffecthookExample from './sections/08-AdvancedConcepts/04-React19UseEffectHook/Example';
import React19apiwithexampleExample from './sections/08-AdvancedConcepts/05-React19APIWithExample/Example';
import React19useactionhookExample from './sections/08-AdvancedConcepts/06-React19UseActionHook/Example';
import React19allnewfeaturesExample from './sections/08-AdvancedConcepts/07-React19AllNewFeatures/Example';
import TodoappExample from './sections/09-Projects/01-TodoApp/Example';
import ShoppingcartExample from './sections/09-Projects/02-ShoppingCart/Example';
import WeatherappExample from './sections/09-Projects/03-WeatherApp/Example';

// Import Notes files
import WhatiscomponentNotes from './sections/01-Basics/01-WhatIsComponent/Notes.md?raw';
import ImportingexportingcomponentsNotes from './sections/01-Basics/02-ImportingExportingComponents/Notes.md?raw';
import JsxbasicsNotes from './sections/01-Basics/03-JSXBasics/Notes.md?raw';
import JsxwithcurlybracesNotes from './sections/01-Basics/04-JSXWithCurlyBraces/Notes.md?raw';
import ClickeventandfunctioncallNotes from './sections/01-Basics/05-ClickEventAndFunctionCall/Notes.md?raw';
import HowtoupgradereactversionNotes from './sections/01-Basics/06-HowToUpgradeReactVersion/Notes.md?raw';
import WhatisstateNotes from './sections/01-Basics/07-WhatIsState/Notes.md?raw';
import TogglehtmlelementNotes from './sections/01-Basics/08-ToggleHTMLElement/Notes.md?raw';
import ConditionalrenderingNotes from './sections/02-PropsAndConditionalRendering/01-ConditionalRendering/Notes.md?raw';
import WhatarepropsNotes from './sections/02-PropsAndConditionalRendering/02-WhatAreProps/Notes.md?raw';
import PropsadvancedNotes from './sections/02-PropsAndConditionalRendering/03-PropsAdvanced/Notes.md?raw';
import PassfunctionaspropsNotes from './sections/02-PropsAndConditionalRendering/04-PassFunctionAsProps/Notes.md?raw';
import UncontrolledcomponentNotes from './sections/02-PropsAndConditionalRendering/05-UncontrolledComponent/Notes.md?raw';
import DerivedstateNotes from './sections/02-PropsAndConditionalRendering/06-DerivedState/Notes.md?raw';
import UsestatehookNotes from './sections/03-HooksAndState/01-UseStateHook/Notes.md?raw';
import UseeffecthookNotes from './sections/03-HooksAndState/02-UseEffectHook/Notes.md?raw';
import UseeffectforlifecycleNotes from './sections/03-HooksAndState/03-UseEffectForLifecycle/Notes.md?raw';
import UserefhookNotes from './sections/03-HooksAndState/04-UseRefHook/Notes.md?raw';
import UsecontextapiNotes from './sections/03-HooksAndState/05-UseContextAPI/Notes.md?raw';
import UsereducerhookNotes from './sections/03-HooksAndState/06-UseReducerHook/Notes.md?raw';
import UsecallbackhookNotes from './sections/03-HooksAndState/07-UseCallbackHook/Notes.md?raw';
import UsememohookNotes from './sections/03-HooksAndState/08-UseMemoHook/Notes.md?raw';
import UsetransitionhookNotes from './sections/03-HooksAndState/09-UseTransitionHook/Notes.md?raw';
import UsedeferredvaluehookNotes from './sections/03-HooksAndState/10-UseDeferredValueHook/Notes.md?raw';
import UseidhookNotes from './sections/03-HooksAndState/11-UseIdHook/Notes.md?raw';
import MakecustomhooksNotes from './sections/03-HooksAndState/12-MakeCustomHooks/Notes.md?raw';
import InlinestylesNotes from './sections/04-Styling/01-InlineStyles/Notes.md?raw';
import DynamicandconditionalstylesNotes from './sections/04-Styling/02-DynamicAndConditionalStyles/Notes.md?raw';
import ExternalstylesNotes from './sections/04-Styling/03-ExternalStyles/Notes.md?raw';
import CssmodulesNotes from './sections/04-Styling/04-CSSModules/Notes.md?raw';
import StyledcomponentsNotes from './sections/04-Styling/05-StyledComponents/Notes.md?raw';
import InstalltailwindcssNotes from './sections/04-Styling/06-InstallTailwindCSS/Notes.md?raw';
import HandlecheckboxesNotes from './sections/05-FormsAndValidation/01-HandleCheckboxes/Notes.md?raw';
import HandleradioanddropdownNotes from './sections/05-FormsAndValidation/02-HandleRadioAndDropdown/Notes.md?raw';
import LoopwithmapfunctionNotes from './sections/05-FormsAndValidation/03-LoopWithMapFunction/Notes.md?raw';
import ReusecomponentinloopNotes from './sections/05-FormsAndValidation/04-ReuseComponentInLoop/Notes.md?raw';
import SimplevalidationNotes from './sections/05-FormsAndValidation/05-SimpleValidation/Notes.md?raw';
import ValidationwithuseactionstateNotes from './sections/05-FormsAndValidation/06-ValidationWithUseActionState/Notes.md?raw';
import LazyloadingNotes from './sections/05-FormsAndValidation/07-LazyLoading/Notes.md?raw';
import AdvancedvalidationNotes from './sections/05-FormsAndValidation/08-AdvancedValidation/Notes.md?raw';
import GetdatafromgetapiNotes from './sections/06-APIIntegration/01-GetDataFromGETAPI/Notes.md?raw';
import SetupjsonserverNotes from './sections/06-APIIntegration/02-SetupJSONServer/Notes.md?raw';
import PostmethodintegrationNotes from './sections/06-APIIntegration/03-PostMethodIntegration/Notes.md?raw';
import DeletemethodintegrationNotes from './sections/06-APIIntegration/04-DeleteMethodIntegration/Notes.md?raw';
import UpdatemethodintegrationNotes from './sections/06-APIIntegration/05-UpdateMethodIntegration/Notes.md?raw';
import PopulatedataininputfieldsNotes from './sections/06-APIIntegration/06-PopulateDataInInputFields/Notes.md?raw';
import EdituserdetailpageNotes from './sections/06-APIIntegration/07-EditUserDetailPage/Notes.md?raw';
import AdduseranduserlistroutesNotes from './sections/06-APIIntegration/08-AddUserAndUserListRoutes/Notes.md?raw';
import WhatisreactrouterNotes from './sections/07-ReactRouter/01-WhatIsReactRouter/Notes.md?raw';
import BasicexampleofrouterNotes from './sections/07-ReactRouter/02-BasicExampleOfRouter/Notes.md?raw';
import HeaderwithreactrouterNotes from './sections/07-ReactRouter/03-HeaderWithReactRouter/Notes.md?raw';
import PageNotFoundNotes from './sections/07-ReactRouter/04-404PageAndRedirect/Notes.md?raw';
import NestednavigationwithrouterNotes from './sections/07-ReactRouter/05-NestedNavigationWithRouter/Notes.md?raw';
import LayoutandindexroutesNotes from './sections/07-ReactRouter/06-LayoutAndIndexRoutes/Notes.md?raw';
import RouteprefixesNotes from './sections/07-ReactRouter/07-RoutePrefixes/Notes.md?raw';
import DynamicrouteswithuseparamsNotes from './sections/07-ReactRouter/08-DynamicRoutesWithUseParams/Notes.md?raw';
import ReactjsfragmentNotes from './sections/08-AdvancedConcepts/01-ReactJSFragment/Notes.md?raw';
import PurecomponentNotes from './sections/08-AdvancedConcepts/02-PureComponent/Notes.md?raw';
import Contextapiinreact19Notes from './sections/08-AdvancedConcepts/03-ContextAPIInReact19/Notes.md?raw';
import React19useeffecthookNotes from './sections/08-AdvancedConcepts/04-React19UseEffectHook/Notes.md?raw';
import React19apiwithexampleNotes from './sections/08-AdvancedConcepts/05-React19APIWithExample/Notes.md?raw';
import React19useactionhookNotes from './sections/08-AdvancedConcepts/06-React19UseActionHook/Notes.md?raw';
import React19allnewfeaturesNotes from './sections/08-AdvancedConcepts/07-React19AllNewFeatures/Notes.md?raw';
import TodoappNotes from './sections/09-Projects/01-TodoApp/Notes.md?raw';
import ShoppingcartNotes from './sections/09-Projects/02-ShoppingCart/Notes.md?raw';
import WeatherappNotes from './sections/09-Projects/03-WeatherApp/Notes.md?raw';

// Notes mapping
const notesMap = {
  '01-WhatIsComponent': WhatiscomponentNotes,
  '02-ImportingExportingComponents': ImportingexportingcomponentsNotes,
  '03-JSXBasics': JsxbasicsNotes,
  '04-JSXWithCurlyBraces': JsxwithcurlybracesNotes,
  '05-ClickEventAndFunctionCall': ClickeventandfunctioncallNotes,
  '06-HowToUpgradeReactVersion': HowtoupgradereactversionNotes,
  '07-WhatIsState': WhatisstateNotes,
  '08-ToggleHTMLElement': TogglehtmlelementNotes,
  '01-ConditionalRendering': ConditionalrenderingNotes,
  '02-WhatAreProps': WhatarepropsNotes,
  '03-PropsAdvanced': PropsadvancedNotes,
  '04-PassFunctionAsProps': PassfunctionaspropsNotes,
  '05-UncontrolledComponent': UncontrolledcomponentNotes,
  '06-DerivedState': DerivedstateNotes,
  '01-UseStateHook': UsestatehookNotes,
  '02-UseEffectHook': UseeffecthookNotes,
  '03-UseEffectForLifecycle': UseeffectforlifecycleNotes,
  '04-UseRefHook': UserefhookNotes,
  '05-UseContextAPI': UsecontextapiNotes,
  '06-UseReducerHook': UsereducerhookNotes,
  '07-UseCallbackHook': UsecallbackhookNotes,
  '08-UseMemoHook': UsememohookNotes,
  '09-UseTransitionHook': UsetransitionhookNotes,
  '10-UseDeferredValueHook': UsedeferredvaluehookNotes,
  '11-UseIdHook': UseidhookNotes,
  '12-MakeCustomHooks': MakecustomhooksNotes,
  '01-InlineStyles': InlinestylesNotes,
  '02-DynamicAndConditionalStyles': DynamicandconditionalstylesNotes,
  '03-ExternalStyles': ExternalstylesNotes,
  '04-CSSModules': CssmodulesNotes,
  '05-StyledComponents': StyledcomponentsNotes,
  '06-InstallTailwindCSS': InstalltailwindcssNotes,
  '01-HandleCheckboxes': HandlecheckboxesNotes,
  '02-HandleRadioAndDropdown': HandleradioanddropdownNotes,
  '03-LoopWithMapFunction': LoopwithmapfunctionNotes,
  '04-ReuseComponentInLoop': ReusecomponentinloopNotes,
  '05-SimpleValidation': SimplevalidationNotes,
  '06-ValidationWithUseActionState': ValidationwithuseactionstateNotes,
  '07-LazyLoading': LazyloadingNotes,
  '08-AdvancedValidation': AdvancedvalidationNotes,
  '01-GetDataFromGETAPI': GetdatafromgetapiNotes,
  '02-SetupJSONServer': SetupjsonserverNotes,
  '03-PostMethodIntegration': PostmethodintegrationNotes,
  '04-DeleteMethodIntegration': DeletemethodintegrationNotes,
  '05-UpdateMethodIntegration': UpdatemethodintegrationNotes,
  '06-PopulateDataInInputFields': PopulatedataininputfieldsNotes,
  '07-EditUserDetailPage': EdituserdetailpageNotes,
  '08-AddUserAndUserListRoutes': AdduseranduserlistroutesNotes,
  '01-WhatIsReactRouter': WhatisreactrouterNotes,
  '02-BasicExampleOfRouter': BasicexampleofrouterNotes,
  '03-HeaderWithReactRouter': HeaderwithreactrouterNotes,
  '04-404PageAndRedirect': PageNotFoundNotes,
  '05-NestedNavigationWithRouter': NestednavigationwithrouterNotes,
  '06-LayoutAndIndexRoutes': LayoutandindexroutesNotes,
  '07-RoutePrefixes': RouteprefixesNotes,
  '08-DynamicRoutesWithUseParams': DynamicrouteswithuseparamsNotes,
  '01-ReactJSFragment': ReactjsfragmentNotes,
  '02-PureComponent': PurecomponentNotes,
  '03-ContextAPIInReact19': Contextapiinreact19Notes,
  '04-React19UseEffectHook': React19useeffecthookNotes,
  '05-React19APIWithExample': React19apiwithexampleNotes,
  '06-React19UseActionHook': React19useactionhookNotes,
  '07-React19AllNewFeatures': React19allnewfeaturesNotes,
  '01-TodoApp': TodoappNotes,
  '02-ShoppingCart': ShoppingcartNotes,
  '03-WeatherApp': WeatherappNotes,
};

// Example mapping
const exampleMap = {
  '01-WhatIsComponent': WhatiscomponentExample,
  '02-ImportingExportingComponents': ImportingexportingcomponentsExample,
  '03-JSXBasics': JsxbasicsExample,
  '04-JSXWithCurlyBraces': JsxwithcurlybracesExample,
  '05-ClickEventAndFunctionCall': ClickeventandfunctioncallExample,
  '06-HowToUpgradeReactVersion': HowtoupgradereactversionExample,
  '07-WhatIsState': WhatisstateExample,
  '08-ToggleHTMLElement': TogglehtmlelementExample,
  '01-ConditionalRendering': ConditionalrenderingExample,
  '02-WhatAreProps': WhatarepropsExample,
  '03-PropsAdvanced': PropsadvancedExample,
  '04-PassFunctionAsProps': PassfunctionaspropsExample,
  '05-UncontrolledComponent': UncontrolledcomponentExample,
  '06-DerivedState': DerivedstateExample,
  '01-UseStateHook': UsestatehookExample,
  '02-UseEffectHook': UseeffecthookExample,
  '03-UseEffectForLifecycle': UseeffectforlifecycleExample,
  '04-UseRefHook': UserefhookExample,
  '05-UseContextAPI': UsecontextapiExample,
  '06-UseReducerHook': UsereducerhookExample,
  '07-UseCallbackHook': UsecallbackhookExample,
  '08-UseMemoHook': UsememohookExample,
  '09-UseTransitionHook': UsetransitionhookExample,
  '10-UseDeferredValueHook': UsedeferredvaluehookExample,
  '11-UseIdHook': UseidhookExample,
  '12-MakeCustomHooks': MakecustomhooksExample,
  '01-InlineStyles': InlinestylesExample,
  '02-DynamicAndConditionalStyles': DynamicandconditionalstylesExample,
  '03-ExternalStyles': ExternalstylesExample,
  '04-CSSModules': CssmodulesExample,
  '05-StyledComponents': StyledcomponentsExample,
  '06-InstallTailwindCSS': InstalltailwindcssExample,
  '01-HandleCheckboxes': HandlecheckboxesExample,
  '02-HandleRadioAndDropdown': HandleradioanddropdownExample,
  '03-LoopWithMapFunction': LoopwithmapfunctionExample,
  '04-ReuseComponentInLoop': ReusecomponentinloopExample,
  '05-SimpleValidation': SimplevalidationExample,
  '06-ValidationWithUseActionState': ValidationwithuseactionstateExample,
  '07-LazyLoading': LazyloadingExample,
  '08-AdvancedValidation': AdvancedvalidationExample,
  '01-GetDataFromGETAPI': GetdatafromgetapiExample,
  '02-SetupJSONServer': SetupjsonserverExample,
  '03-PostMethodIntegration': PostmethodintegrationExample,
  '04-DeleteMethodIntegration': DeletemethodintegrationExample,
  '05-UpdateMethodIntegration': UpdatemethodintegrationExample,
  '06-PopulateDataInInputFields': PopulatedataininputfieldsExample,
  '07-EditUserDetailPage': EdituserdetailpageExample,
  '08-AddUserAndUserListRoutes': AdduseranduserlistroutesExample,
  '01-WhatIsReactRouter': WhatisreactrouterExample,
  '02-BasicExampleOfRouter': BasicexampleofrouterExample,
  '03-HeaderWithReactRouter': HeaderwithreactrouterExample,
  '04-404PageAndRedirect': PageNotFoundExample,
  '05-NestedNavigationWithRouter': NestednavigationwithrouterExample,
  '06-LayoutAndIndexRoutes': LayoutandindexroutesExample,
  '07-RoutePrefixes': RouteprefixesExample,
  '08-DynamicRoutesWithUseParams': DynamicrouteswithuseparamsExample,
  '01-ReactJSFragment': ReactjsfragmentExample,
  '02-PureComponent': PurecomponentExample,
  '03-ContextAPIInReact19': Contextapiinreact19Example,
  '04-React19UseEffectHook': React19useeffecthookExample,
  '05-React19APIWithExample': React19apiwithexampleExample,
  '06-React19UseActionHook': React19useactionhookExample,
  '07-React19AllNewFeatures': React19allnewfeaturesExample,
  '01-TodoApp': TodoappExample,
  '02-ShoppingCart': ShoppingcartExample,
  '03-WeatherApp': WeatherappExample,
};

function App() {
  const [currentSection, setCurrentSection] = useState(() => {
    return SECTIONS_DATA['01-Basics']?.[0] || null;
  });

  const sectionNotes = currentSection ? (notesMap[currentSection.id] || '# Notes coming soon...\n\nThis section is being prepared.') : '';
  const sectionExample = currentSection ? (exampleMap[currentSection.id] || (() => <div>Example not available</div>)) : null;

  const challengeContent = `
## Challenge: Practice Your Skills

Try to recreate or enhance the examples you see in this section.

### Easy Challenge
- Modify the example code
- Try different input values
- Change the styling or text

### Medium Challenge
- Add new functionality
- Implement similar patterns
- Create variations of the example

### Advanced Challenge
- Combine concepts from multiple sections
- Build a mini project using these concepts
- Optimize the code for performance

---

**Practice makes perfect!** Experiment with the code and build your own variations.
  `;

  return (
    <div className="app-container">
      <Navigation 
        sections={SECTIONS_DATA}
        onSectionSelect={setCurrentSection}
        currentSection={currentSection}
      />
      
      <main className="main-content">
        {currentSection && sectionExample ? (
          <SectionTemplate
            title={currentSection.label}
            description={`Learn about ${currentSection.label} in React 19`}
            exampleComponent={sectionExample}
            notes={sectionNotes}
            challenge={challengeContent}
          />
        ) : (
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h2>👋 Welcome to React 19 Learning Hub!</h2>
            <p>Select a section from the left sidebar to get started.</p>
            <p style={{ marginTop: '1rem', color: '#666' }}>
              🎯 All 66 sections are now fully populated with examples and notes!
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;