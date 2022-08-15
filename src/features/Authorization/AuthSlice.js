import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { useSnackbar } from 'notistack';
import Cookies from "universal-cookie";


const fetchUser= async ()=>{

}

const AuthSlice = createSlice({
    name: 'Authorization',
    initialState: {
        loading: true,
        error: null,
        token: null
    },
    reducers: {
        signIn: async (state, action) => {
            await axios.post(`${process.env.REACT_APP_API_HOST}/auth`, {
                email: action.email,
                password: action.password
            }, {
                headers: { 'Content-Type': 'application/json' }
            }).then(res => {
                // const { data } = res.data;
                // const cookies = new Cookies();
                // cookies.set('token', data.token)
                // state.loading = false;
            }).catch(err => console.log(err))

            //eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMzBjMTI0OWY0NTA4NjY5Y2VhMTZmMWRjMDlmOWEzNTJmNmFhZDE4YjdjYjZlOWExYThkZWRhNjRlMDVkYTQwODEyZjljMjUwMDM1ZTlhZTQiLCJpYXQiOjE2NTg3NjE0MjQuMzg0Nzc1LCJuYmYiOjE2NTg3NjE0MjQuMzg0Nzc3LCJleHAiOjE2NTkwMjA2MjQuMjkyOTI0LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.RDYg41eS_XzoJNMPeMTxS_8FNHTlXuni8RNFbARTTHdAed9fKhm5QFk3fmE5O7E62NGaQQgKjQPd5AaSZGDeB1TJ895Za0ZyRWtZrdnOjT30COHqnRze-TMWT7OJp3PyYtB-eixUHR6drIGDwfDm994n9J5UGKcKsw9-nlvzkm7RGrhkbkXE2nANXGB5tB1hMjh-0S2PlYrxbYmhaXcxocK9RWAIidO6SxYE54nqbCTiJRWATo1viC1w-Rd3fb7k2lwVd_jI93pmaSMCMFfeGyRWynAnPjAmG2ROiRu3XbVcH75vxmNepp9qzvsljSB2cPt9QV5IJKy2cSnKDpCs_esqtLPe0pXq2hFEFMDil-1pq1xH7nRsmYoCyvxaECGITbEn3Vv1PNHkKHbqDcq02CXpCfTdHkQmGPmqQAdj2Y3aTTYLDHEtepL5E4yMlXNiu_dTR7uiDTsRW-_Ywin0XDz29E98eIF0LixB98wfLvqoLBCC8qpg0Q0IWMEssqdmGMBP0X0eI73lTMpOEESBf7ImeuwC4xZQ98OfOE8oppLG9QzTNgNm17bY0em9Xnou638zwjhKPiJx4L8bqnts8QUxnvKJvwf12ENe0RE7LPu3ig2Hr58gxV9vuM4DxKWsbP_M_DR_RVm0sFQsvwg6BSrTaPyLyKNMGkLDSgSSdYg
            // axios.get(`${process.env.REACT_APP_API_HOST}/user`,
            //     {
            //         headers: {
            //             'Accept': 'application/json', 'Authorization': `Bearer ${new Cookies().get('token')}`
            //         }
            //     })
            //     .then(res => state.token = res.data)
            // .catch(err => enqueueSnackbar('Login API Xətası: ' + err.code, { variant: 'error' }))
        }
    }
})


export const { signIn } = AuthSlice.actions;
export default AuthSlice.reducer