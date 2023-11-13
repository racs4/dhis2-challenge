# DHIS2 Challenge

## The Challenge

DHIS2 Frontend Task - Option 2
Build a React application that fetches and renders the list of dashboards available to a DHIS2 user.

## The Solution

The solution is a React application initialized with vitejs. It does not use any UI framework, or any other library apart from the ones used for testing.

## Folders

I structured the application in a way that it is easy to navigate through the code. i have a `common` folder that contains all the common components, and a `home` folder that contains all the components related to the `home` (dashboard) page. In each folder, I have sub folders for especific development tasks, like `components`, `hooks`, `utils`, etc.

## Tests

I used vitest to test the application. I only tested the components itself, not the hooks. This is because I am not sure how to test hooks yet, so I decided to leave it out for now. I also did not test the `App` component, because it is just a wrapper for the main component, and it does not have any logic.

## Some details

I tried to create custom hooks to encapsulate the logic, of the vaious requeriments. This way, the components are more clean and easy to read.

I implemented an optional memoized fetch hook, that can be used to fetch data from the API. It is optionally memoized, so it will only fetch the data once, and then return the same data for every call. This is useful for data that does not change often, like the list of dashboards.

A high order component to fetch the data was also implemented. This way, the components that need to fetch data can be wrapped with this HOC, and the data will be available in the component props, with loading and error treatment included.

The localStorageLogic was wrapped in an util file to make it easier to use. This way, the components do not need to know how the localStorage works, and they can just call the functions to save and retrieve the data. The `addId`, `removeId` and `onLoadDashboards` works changing the localStorage in a concise way.

The tests were created with the user in mind. I tried to test the components as a user would use them, and not the implementation details. This way, if the implementation changes, the tests will still pass. The main tests are in `src/home/components/DashboardList/index.test.tsx` where the filter, localStorage and fetch logic are tested.

## Filters

For some reason I thought that the filters were about the dashboards, and not the dashboard items. So I implemented the filters to filter the dashboards with its `displayName` and `starred`. But after read the requeriments again, I realized that the filters were about the dashboard items `type`. So I implemented this filter and also kept the other filters, because I thought it was a nice feature to have.

## How to run

```
npm install
npm run dev
```

## How to test

```
npm run test
```

## How to build

```
npm run build
```
