// import { useAuthContext } from "@/context/AuthContext"
// import { useRouter } from "next/router";
// import { useEffect } from "react";



// const withAuth = (WrappedComponent: React.FC) => {
//     return (props: any) => {
//         const { user, authIsReady } = useAuthContext();
//         const router = useRouter();

//         useEffect(() => {
//             if (authIsReady && !user) {
//                 router.push('/');
//             }
//         }, [user, authIsReady, router]);

//         if (!user) {
//             return null;
//         }

        

//         return <WrappedComponent {...props} />
//     };

// }

// export default withAuth;