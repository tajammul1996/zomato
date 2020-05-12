import React from "react";

class Home extends React.Component {
  state = {
    categories: [],
    latitude: "",
    longitude: "",
    searchResult: []
  };

  componentDidMount() {
    this.getCurrectLocation();
  }

  getCurrectLocation = () => {
    window.navigator.geolocation.getCurrentPosition(position => {
      this.setState(
        {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        },
        () => console.log(this.state.latitude, this.state.longitude)
      );
    });
  };

  searchRestaurants = searchText => {
    console.log(searchText);
    fetch(
      `https://developers.zomato.com/api/v2.1/search?q=${searchText}&count=5&lat=${
        this.state.latitude
      }&lon=${this.state.longitude}&sort=real_distance&order=asc
`,
      {
        headers: {
          "user-key": "8fa87ac61412b80b53536a2aa6e45648"
        }
      }
    )
      .then(res => res.json())
      .then(data =>
        this.setState({ searchResult: data.restaurants }, () =>
          console.log(this.state.searchResult)
        )
      )
      .catch(err => console.log(err));
  };

  render() {
    return (
      <>
        <div>
          <input
            type="text"
            onChange={e => this.searchRestaurants(e.target.value)}
            placeholder="enter restaurant name..."
          />
          {this.state.searchResult.length &&
            this.state.searchResult.map(({ restaurant }) => (
              <div>
                {restaurant.name} - {restaurant.location.address}
              </div>
            ))}
        </div>
      </>
    );
  }
}

export default Home;
