import { Component } from 'react';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import './App.css';


class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: '',
    };
  }

   
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => 
        this.setState(
          () => {
            return { monsters: users };
          },
        )
      );
  }


  onSearchChange = (e) => {
     const searchField = e.target.value.toLocaleLowerCase();

     this.setState(() => {
     return { searchField };
     });
  }
  
  
  render() {
    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;
    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    return (
      <div className='App'>
        <h1 className='app-title'>Monsters Rolodex</h1>
        <SearchBox 
          className='search-box-monster'
          placeholder='search monsters' 
          onChange={onSearchChange} 
        />
        <CardList monsters={ filteredMonsters } />
      </div>
     );
    
  }

}


export default App;
