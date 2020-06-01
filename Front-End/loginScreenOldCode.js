componentDidMount(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({"email":"a@gmail.com","oauthid":"123456"});

    var requestOptions = {
        method: 'POST',
        credentials: 'include',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    return fetch("http://freeway.eastus.cloudapp.azure.com:8000/api/login", requestOptions)
        .then(response => response.text())
        .then(result => {
            this.setState({
            isLoading: false,
            dataSource: result,
            });
        })
        .catch(error => console.log('error', error));
    
}
    
  
    render() {

        if (this.state.LoginAttempt == true) {
            this.props.navigation.navigate('Profile')
        }
            
        
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                <ActivityIndicator />
                </View>
            )
        }
        else {
            return (
                <View style={styles.login}>
            
                    <Image source={require('./assets/Logo.png')} style={{width: 200, height: 200}} />
            
                    <Text style={{fontSize: 40}}>Freeway</Text>
            
                    <Text style={{fontSize: 20}}>Welcome to our application!</Text>
                    
                    <Text style={{flexWrap: 'wrap', textAlign: 'center'}}>Our mission is to provide a way for humans to help one another through a simple matching process</Text>
                    <Text>{' '}{' '}</Text>

                    <TouchableOpacity onPress={() => this.setState({LoginAttempt: true})} >
                        <Text >
                            Login
                        </Text>
                    </TouchableOpacity >
            
                    
            
                </View>
            )
        }
    }
}


const styles = StyleSheet.create({

    login:{
      flexGrow:1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
  
    },
  
    container: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
  
    },
  
    scrollView: {
      alignItems: 'stretch',
  
  
    },
  
    backButton: {
      alignSelf: "flex-end",
      alignItems:'center',
      backgroundColor: '#aaa',
      margin: 20,
      padding: 10,
    }
  
  });  