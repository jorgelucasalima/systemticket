import {Route, Redirect} from 'react-router-dom'

export default function RouteWrapper({
    component: Component,
    isPrivate,
    ...rest
}){

    const loading = false
    const signed = false


    if (loading) {
        return(
            <div></div>
        )
    }

    // se não tiver logado e a tela é privada rediciona ele para "/" tela de login
    if (!signed && isPrivate) {
        return <Redirect to="/" />
    }

    // se tiver logado e a tela não for privada então executa o que está dentro no if
    if (signed && !isPrivate) {
        return <Redirect to="/dashboard" />
    }

    return (
        <Route 
            {...rest}
            render={ props => (
                <Component {...props} />
            )}
        />
    )
}