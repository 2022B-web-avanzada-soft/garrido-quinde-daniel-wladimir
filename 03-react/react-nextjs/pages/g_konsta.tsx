import {App, BlockTitle, List, ListItem, Navbar, Page} from "konsta/react";
//con esta tenemos diferentes componentes ya hechos en react
//https://mui.com/material-ui/react-button/
export default function (){
    return(
        <>
            <App theme="ios">
                <Page>
                    <Navbar title="List"/>
                    <BlockTitle>Links, Header, Footer</BlockTitle>
                    <List strongIos outlineIos>
                        <ListItem
                            link
                            header="Name"
                            title="John Doe"
                            after="Edit"
                        />
                        <ListItem
                            link
                            header="Phone"
                            title="+7 90 111-22-3344"
                            after="Edit"
                        />
                        <ListItem
                            link
                            header="Email"
                            title="john@doe"
                            footer="Home"
                            after="Edit"

                        />
                        <ListItem
                            link
                            header="Email"
                            title="john@konsta"
                            footer="Work"
                            after="Edit"

                        />
                    </List>
                </Page>
            </App>
        </>
    )
}