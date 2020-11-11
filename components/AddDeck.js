import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { connect } from 'react-redux'
import DeckView from './DeckView'
import { black, white, red } from '../utils/colors'

const Button = styled.View`
  background: ${(props) => (props.primary ? 'black' : 'white')};
  margin-bottom: 30px;
  width: 260px;
  align-items: center;
  border-radius: 3px;
`

const ButtonText = styled.Text`
  color: ${(props) => (props.primary ? 'white' : 'black')};
  text-align: center;
  padding: 20px;
`

class AddDeck extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text>What is the title of your new deck?</Text>
          <TextInput
            style={{ height: 40 }}
            placeholder="Type here to translate!"
            // onChangeText=""
            defaultValue=""
          />
        </View>
        <View
          style={{
            flex: 2,
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px solid black',
          }}
        >
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('DeckView')}
          >
            <Button primary>
              <ButtonText primary>Create Deck</ButtonText>
            </Button>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    decks: state,
  }
}
export default connect(mapStateToProps)(AddDeck)
