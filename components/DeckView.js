import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TouchableOpacity, View, Text } from 'react-native'
import styled from 'styled-components/native'
import { black, white } from '../utils/colors'
import { removeDeck } from '../actions'
import { removeDeckAsync } from '../utils/api'

const Container = styled.View`
  flex: 1;
  background: white;
`
const DeckDetails = styled(Container)`
  justify-content: center;
  align-items: center;
`

const ButtonGrp = styled(DeckDetails)`
  flex: 1;
  justify-content: flex-end;
`

const Button = styled.View`
  background: ${(props) => (props.primary ? 'black' : 'white')};
  margin-bottom: 30px;
  width: 260px;
  align-items: center;
  border-radius: 3px;
  border: 1px solid black;
`
const StartButton = styled(Button)`
  border-color: white;
`
const DeleteButton = styled(Button)`
  background: transparent;
  border: none;
`

const ButtonText = styled.Text`
  color: ${(props) => (props.primary ? 'white' : 'black')};
  text-align: center;
  padding: 20px;
`

const DeleteButtonText = styled(ButtonText)`
  color: red;
`

const TitleText = styled.Text`
  font-size: 28px;
`
const CardText = styled.Text`
  font-size: 20px;
`

class DeckView extends Component {
  onDelete = async () => {
    const { navigation, dispatch, deck } = this.props
    const { title } = deck
    const id = title
    dispatch(removeDeck(id))
    // https://knowledge.udacity.com/questions/200468
    await removeDeckAsync(id)

    navigation.navigate('DeckList')
  }

  render() {
    const { navigation, deck } = this.props

    if (!deck) return false

    return (
      <Container>
        <DeckDetails>
          <View>
            <TitleText>{deck.title}</TitleText>
          </View>
          <View>
            <CardText>{deck.questions.length} cards</CardText>
          </View>
        </DeckDetails>

        <ButtonGrp>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('AddCard', {
                title: deck.title,
              })
            }
          >
            <Button>
              <ButtonText>Add Card</ButtonText>
            </Button>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('QuizView', {
                title: deck.title,
                questions: deck.questions,
              })
            }
          >
            <StartButton primary>
              <ButtonText primary>Start Quiz</ButtonText>
            </StartButton>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onDelete}>
            <DeleteButton primary>
              <DeleteButtonText>Delete Deck</DeleteButtonText>
            </DeleteButton>
          </TouchableOpacity>
        </ButtonGrp>
      </Container>
    )
  }
}

function mapStateToProps(state, { route }) {
  // https://reactnavigation.org/docs/params
  const { title } = route.params
  const deck = state[title]

  return {
    deck,
  }
}
export default connect(mapStateToProps)(DeckView)
