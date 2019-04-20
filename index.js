import React, { Component } from 'react'
import App from './App'
import Store from './mobx/Store';
import { name as appName } from './app.json';

import {
    AppRegistry,
    Navigator
} from 'react-native'

class MapProject extends Component {

    renderScene(route, navigator) {
        return <route.component {...route.passProps} navigator={navigator} />
    }
    configureScene(route, routeStack) {
        if (route.type === 'Modal') {
            return Navigator.SceneConfigs.FloatFromBottom
        }
        return Navigator.SceneConfigs.PushFromRight
    }
    render() {
        return (
            <Navigator
                configureScene={this.configureScene.bind(this)}
                renderScene={this.renderScene.bind(this)}
                initialRoute={{
                    component: App,
                    passProps: {
                        store: Store
                    }
                }} />
        )
    }
}

AppRegistry.registerComponent(appName, () => App)
