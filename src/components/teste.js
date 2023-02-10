import { UserContext } from "common/context/User"

export default function Teste() {
    return (
        <UserContext.Consumer>
            {({nome}) => {
                console.log(nome);
                return <h1>{nome}</h1>
            }}
        </UserContext.Consumer>
    )
}