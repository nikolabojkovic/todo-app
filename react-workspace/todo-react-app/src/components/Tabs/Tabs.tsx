import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faAdd, faFilter, faDownload, IconDefinition, faGear } from '@fortawesome/free-solid-svg-icons';
import { Stack } from "react-bootstrap";
import { useState } from "react";

import { AddTodo, Search, FilterTodos, ImportExport, Settings } from '../';
import { useTodoList, useTodoListDispatch } from "../../context";
import { IAction, TodoActions } from "../../models";

type Tab = {
  name: string,
  icon: IconDefinition,
  content: JSX.Element,
  className: string,
}

export function Tabs() {
  const [active, setActive] = useState('add-todo');
  const todoList = useTodoList();
  const dispatch = useTodoListDispatch();

  const downloadLink = document.createElement('a');
  downloadLink.setAttribute('data-test-id', 'download-link');
  const fileReader = new FileReader(); 

  const tabs: Tab[] = [{
      name: 'add-todo',
      icon: faAdd,
      content: <AddTodo/>,
      className: 'fade-in'
    } as Tab,
    {
      name: 'search-todos',
      icon: faSearch,
      content: <Search placeholder='Search by title or description' />,
      className: 'fade-in'
    } as Tab,
    {
      name: 'filter-todos',
      icon: faFilter,
      content: <FilterTodos filter={todoList.filter} />,
      className: ''
    },
    {
      name: 'import-export',
      icon: faDownload,
      content: <ImportExport downloadLink={downloadLink} fileReader={fileReader} alert={window.alert}/>,
      className: 'fade-in'
    } as Tab,
    {
      name: 'settings',
      icon: faGear,
      content: <Settings />,
      className: 'fade-in'
    } as Tab
  ] as Tab [];  
  const activeChild = tabs.find((item: Tab) => item.name === active);

  function handleTabChange(tab: Tab) {
    setActive(tab.name);
    dispatch({
      type: TodoActions.activeTabChanged,
      payload: {
        activeTab: tab.name
      }
    } as IAction);
  }

  return (
    <section className="App__tabs mb-2" data-testid="tabs">
      <section className='App__tabs__header'>
        <Stack direction="horizontal" gap={1} className='align-items-end'>      
          {tabs.map((tab: Tab) => (
            <div 
              data-testid={tab.name}
              key={tab.name}
              className={ 
                active === tab.name 
                ? "App__tabs__item" 
                : "App__tabs__item App__tabs__item--inactive"
              } 
              onClick={() => handleTabChange(tab)}
            >      
              <FontAwesomeIcon icon={tab.icon} />
            </div>
          ))}
        </Stack>
      </section>      
      <section className="App__tabs__content">
        <div 
          data-testid={"tab-content-" + activeChild?.name}
          key={"tab-content-" + activeChild?.name}
          className={activeChild?.className}
        >
          {activeChild?.content}
        </div>
      </section>     
    </section>
  );
}