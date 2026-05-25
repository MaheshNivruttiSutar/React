// Navigation structure - maps all sections
export const SECTIONS_DATA = {
  '01-Basics': [
    { id: '01-WhatIsComponent', label: 'What is Component?', path: '01-WhatIsComponent' },
    { id: '02-ImportingExportingComponents', label: 'Importing & Exporting', path: '02-ImportingExportingComponents' },
    { id: '03-JSXBasics', label: 'JSX Basics', path: '03-JSXBasics' },
    { id: '04-JSXWithCurlyBraces', label: 'JSX with Curly Braces', path: '04-JSXWithCurlyBraces' },
    { id: '05-ClickEventAndFunctionCall', label: 'Click Event & Function Call', path: '05-ClickEventAndFunctionCall' },
    { id: '06-HowToUpgradeReactVersion', label: 'Upgrade React Version', path: '06-HowToUpgradeReactVersion' },
    { id: '07-WhatIsState', label: 'What is State?', path: '07-WhatIsState' },
    { id: '08-ToggleHTMLElement', label: 'Toggle HTML Element', path: '08-ToggleHTMLElement' },
  ],
  '02-PropsAndConditionalRendering': [
    { id: '01-ConditionalRendering', label: 'Conditional Rendering', path: '01-ConditionalRendering' },
    { id: '02-WhatAreProps', label: 'What are Props?', path: '02-WhatAreProps' },
    { id: '03-PropsAdvanced', label: 'Props Advanced', path: '03-PropsAdvanced' },
    { id: '04-PassFunctionAsProps', label: 'Pass Function as Props', path: '04-PassFunctionAsProps' },
    { id: '05-UncontrolledComponent', label: 'Uncontrolled Component', path: '05-UncontrolledComponent' },
    { id: '06-DerivedState', label: 'Derived State', path: '06-DerivedState' },
  ],
  '03-HooksAndState': [
    { id: '01-UseStateHook', label: 'useState Hook', path: '01-UseStateHook' },
    { id: '02-UseEffectHook', label: 'useEffect Hook', path: '02-UseEffectHook' },
    { id: '03-UseEffectForLifecycle', label: 'useEffect for Lifecycle', path: '03-UseEffectForLifecycle' },
    { id: '04-UseRefHook', label: 'useRef Hook', path: '04-UseRefHook' },
    { id: '05-UseContextAPI', label: 'useContext API', path: '05-UseContextAPI' },
    { id: '06-UseReducerHook', label: 'useReducer Hook', path: '06-UseReducerHook' },
    { id: '07-UseCallbackHook', label: 'useCallback Hook', path: '07-UseCallbackHook' },
    { id: '08-UseMemoHook', label: 'useMemo Hook', path: '08-UseMemoHook' },
    { id: '09-UseTransitionHook', label: 'useTransition Hook', path: '09-UseTransitionHook' },
    { id: '10-UseDeferredValueHook', label: 'useDeferredValue Hook', path: '10-UseDeferredValueHook' },
    { id: '11-UseIdHook', label: 'useId Hook', path: '11-UseIdHook' },
    { id: '12-MakeCustomHooks', label: 'Custom Hooks', path: '12-MakeCustomHooks' },
  ],
  '04-Styling': [
    { id: '01-InlineStyles', label: 'Inline Styles', path: '01-InlineStyles' },
    { id: '02-DynamicAndConditionalStyles', label: 'Dynamic & Conditional', path: '02-DynamicAndConditionalStyles' },
    { id: '03-ExternalStyles', label: 'External Styles', path: '03-ExternalStyles' },
    { id: '04-CSSModules', label: 'CSS Modules', path: '04-CSSModules' },
    { id: '05-StyledComponents', label: 'Styled Components', path: '05-StyledComponents' },
    { id: '06-InstallTailwindCSS', label: 'Install Tailwind CSS', path: '06-InstallTailwindCSS' },
  ],
  '05-FormsAndValidation': [
    { id: '01-HandleCheckboxes', label: 'Handle Checkboxes', path: '01-HandleCheckboxes' },
    { id: '02-HandleRadioAndDropdown', label: 'Radio & Dropdown', path: '02-HandleRadioAndDropdown' },
    { id: '03-LoopWithMapFunction', label: 'Loop with Map', path: '03-LoopWithMapFunction' },
    { id: '04-ReuseComponentInLoop', label: 'Reuse in Loop', path: '04-ReuseComponentInLoop' },
    { id: '05-SimpleValidation', label: 'Simple Validation', path: '05-SimpleValidation' },
    { id: '06-ValidationWithUseActionState', label: 'useActionState Validation', path: '06-ValidationWithUseActionState' },
    { id: '07-LazyLoading', label: 'Lazy Loading', path: '07-LazyLoading' },
    { id: '08-AdvancedValidation', label: 'Advanced Validation', path: '08-AdvancedValidation' },
  ],
  '06-APIIntegration': [
    { id: '01-GetDataFromGETAPI', label: 'GET API Method', path: '01-GetDataFromGETAPI' },
    { id: '02-SetupJSONServer', label: 'Setup JSON Server', path: '02-SetupJSONServer' },
    { id: '03-PostMethodIntegration', label: 'POST Method', path: '03-PostMethodIntegration' },
    { id: '04-DeleteMethodIntegration', label: 'DELETE Method', path: '04-DeleteMethodIntegration' },
    { id: '05-UpdateMethodIntegration', label: 'UPDATE Method', path: '05-UpdateMethodIntegration' },
    { id: '06-PopulateDataInInputFields', label: 'Populate Input Fields', path: '06-PopulateDataInInputFields' },
    { id: '07-EditUserDetailPage', label: 'Edit User Detail', path: '07-EditUserDetailPage' },
    { id: '08-AddUserAndUserListRoutes', label: 'User Routes', path: '08-AddUserAndUserListRoutes' },
  ],
  '07-ReactRouter': [
    { id: '01-WhatIsReactRouter', label: 'What is React Router?', path: '01-WhatIsReactRouter' },
    { id: '02-BasicExampleOfRouter', label: 'Basic Router', path: '02-BasicExampleOfRouter' },
    { id: '03-HeaderWithReactRouter', label: 'Header with Router', path: '03-HeaderWithReactRouter' },
    { id: '04-404PageAndRedirect', label: '404 & Redirect', path: '04-404PageAndRedirect' },
    { id: '05-NestedNavigationWithRouter', label: 'Nested Navigation', path: '05-NestedNavigationWithRouter' },
    { id: '06-LayoutAndIndexRoutes', label: 'Layout & Index Routes', path: '06-LayoutAndIndexRoutes' },
    { id: '07-RoutePrefixes', label: 'Route Prefixes', path: '07-RoutePrefixes' },
    { id: '08-DynamicRoutesWithUseParams', label: 'Dynamic Routes', path: '08-DynamicRoutesWithUseParams' },
  ],
  '08-AdvancedConcepts': [
    { id: '01-ReactJSFragment', label: 'React Fragment', path: '01-ReactJSFragment' },
    { id: '02-PureComponent', label: 'Pure Component', path: '02-PureComponent' },
    { id: '03-ContextAPIInReact19', label: 'Context API', path: '03-ContextAPIInReact19' },
    { id: '04-React19UseEffectHook', label: 'React 19 useEffect', path: '04-React19UseEffectHook' },
    { id: '05-React19APIWithExample', label: 'React 19 API', path: '05-React19APIWithExample' },
    { id: '06-React19UseActionHook', label: 'useAction Hook', path: '06-React19UseActionHook' },
    { id: '07-React19AllNewFeatures', label: 'React 19 Features', path: '07-React19AllNewFeatures' },
  ],
  '09-Projects': [
    { id: '01-TodoApp', label: 'Todo App', path: '01-TodoApp' },
    { id: '02-ShoppingCart', label: 'Shopping Cart', path: '02-ShoppingCart' },
    { id: '03-WeatherApp', label: 'Weather App', path: '03-WeatherApp' },
  ],
};

// Helper function to get all sections flat
export const getAllSections = () => {
  const all = [];
  Object.values(SECTIONS_DATA).forEach(category => {
    all.push(...category);
  });
  return all;
};

// Helper function to find a section by id
export const findSectionById = (id) => {
  for (const category of Object.values(SECTIONS_DATA)) {
    const section = category.find(s => s.id === id);
    if (section) return section;
  }
  return null;
};

// Get category label
export const getCategoryLabel = (categoryId) => {
  const labels = {
    '01-Basics': '📚 Basics',
    '02-PropsAndConditionalRendering': '🎨 Props & Conditional',
    '03-HooksAndState': '⚙️ Hooks & State',
    '04-Styling': '🎯 Styling',
    '05-FormsAndValidation': '📝 Forms & Validation',
    '06-APIIntegration': '🔌 API Integration',
    '07-ReactRouter': '🛣️ React Router',
    '08-AdvancedConcepts': '🚀 Advanced',
    '09-Projects': '🏗️ Projects',
  };
  return labels[categoryId] || categoryId;
};
