import Versions from './components/Versions';
import electronLogo from './assets/electron.svg';
import { login } from './apis/login';

function App(): JSX.Element {
    async function get() {
        const res = await fetch('https://we.cqupt.edu.cn/api/verification?cqupt_id=1679535', {
            method: 'GET'
        });
        console.log(res);
    }
    async function Login() {
        const res = await login('1686965', '1104850836L');
        console.log(res);
    }
    return (
        <>
            <button onClick={Login}>点击登陆</button>
        </>
    );
}

export default App;
