import { useLocation, Naviagete, Outlet} from 'react-router-dom';
import useAuth from '../hooks/Step2_useAuth';

const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation;

    return (
        auth?.user
            ? <Outlet />
            : <Naviagete to="login" state={{ from : location}} replace />  // 뒤로 돌아가기를 가능하게 하는 것(state)
    );
}
 
export default RequireAuth;

// // 관리자 역할 별 권한 관리
// const RequireAuth = (allowedRoles) => {
//     const { auth } = useAuth();
//     const location = useLocation;

//     return (
//         auth?.roles?.find(role => allowedRoles?.includes(role))
//             ? <Outlet />
//             : auth?.user
//                 ? <Naviagete to="/unauthorized" state={{ from : location }} replace />  // 관리자가 아닌 사용자가 관리자 페에지에 들어가려고 할 경우 권한 없음 페이지를 보여주게 한다
//                 : <Naviagete to="login" state={{ from : location}} replace />  // 뒤로 돌아가기를 가능하게 하는 것(state)
//     );
// }
 
// export default RequireAuth;









// 네, `next/router`를 사용하여 `react-router-dom`의 코드를 `next/router`로 변환할 수 있습니다. 아래는 해당 코드를 `next/router`를 사용하여 변경한 예시입니다:

// ```jsx
// import { useRouter } from 'next/router';
// import useAuth from '../hooks/Step2_useAuth';

// const RequireAuth = () => {
//     const { auth } = useAuth();
//     const router = useRouter();

//     return (
//         auth?.user //email
//             ? <Outlet />
//             : (router.push('/login', undefined, { shallow: true }), null)  얕은 라우팅
//     );
// };

// export default RequireAuth;
// ```

// 변경된 코드에서 `useLocation` 대신 `useRouter`를 사용하여 현재 라우팅 정보에 접근합니다. `useRouter`는 Next.js에서 제공하는 훅으로, `pathname`, `query`, `push`, `replace` 등의 메서드를 사용할 수 있습니다.

// `<Navigate />` 컴포넌트는 `next/router`에서는 제공하지 않습니다. 대신 `router.push()` 메서드를 사용하여 로그인 페이지로 이동하도록 수정하였습니다. 또한 `state`와 `replace` 옵션을 사용할 필요가 없으므로 해당 부분은 삭제하였습니다.

// 또한, `react-router-dom`의 `<Outlet />`은 Next.js에서는 사용할 수 없습니다. Next.js에서는 파일 기반 라우팅을 사용하기 때문에 페이지 구조에 따라 자동으로 라우팅이 처리됩니다. 따라서 `<Outlet />` 대신 해당 페이지의 컴포넌트를 직접 렌더링하면 됩니다.

// 이와 같이 코드를 수정하면 `react-router-dom`의 코드를 `next/router`로 변환하여 사용할 수 있습니다. 다만, Next.js는 다른 라우팅 방식을 가지고 있으므로 코드의 일부 로직이 변경되었음을 유의해야 합니다.