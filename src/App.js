import Login from "./compoents/Login";
import Layout from "./compoents/Layout";

//step2
import RequireAuth from "./compoents/Step2_RequireAuth";
import {Routes, Route} from 'react-router-dom'

function App() {

    const ROLES = {
        'User' : 2001,
        'Editor' : 1984,
        'Admin' : 5150
    }

    return (
        //step 1
        // <main className="App">
        //     <Login/>
        // </main>

        <Routes>
            <Route path="/" element={<Layout />}>

                {/* public routes */}
                <Route path="login" element={<Login />} />

                {/* protect routes */}
                <Route element={ <RequireAuth />}>
                    <Route path="home" element={<Home />} />

                </Route>

                {/* 권한 별 라우팅
                <Route element={ <RequireAuth  allowedRoles={[ROLES.User]} />}>
                    <Route path="home" element={<Home />} />
                </Route>
                <Route element={ <RequireAuth  allowedRoles={[ROLES.Editor]} />}>
                    <Route path="editor" element={<Editor />} />
                </Route>
                <Route element={ <RequireAuth  allowedRoles={[ROLES.Admin]} />}>
                    <Route path="admin" element={<Admin />} />
                </Route>
                <Route element={ <RequireAuth  allowedRoles={[ROLES.Editor, ROLES.Admin]} />}>
                    <Route path="editor" element={<Editor />} />
                </Route> */}

            </Route>
        </Routes>

    );
}

export default App;