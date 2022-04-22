import Header from "components/views/Header";
import AppRouter from "components/routing/routers/AppRouter";
import {StompSessionProvider} from "react-stomp-hooks";
import {getWebsocketDomain} from "./helpers/getDomain";

/**
 * Happy coding!
 * React Template by Lucas Pelloni
 * Overhauled by Kyrill Hux
 */
const App = () => {
  return (
    <div>
        {/*<StompSessionProvider*/}
        {/*brokerURL={`${getWebsocketDomain()}/websocket`}*/}
        {/*    debug={STOMP => console.log({STOMP})}*/}
        {/*    onConnect={() => console.log({STOMP_CONNECT: 'TCP connection successfully established'})}*/}
        {/*>*/}
        {/*    <Header height="100"/>*/}
        {/*    <AppRouter/>*/}
        {/*</StompSessionProvider>*/}
        <Header height="100"/>
        <AppRouter/>
    </div>
  );
};

export default App;
