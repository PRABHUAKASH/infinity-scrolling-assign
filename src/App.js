import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import InfiniteScroll from 'react-infinite-scroll-component';

function App() {
  const [posts, setPosts] = useState([]);
  const [totalPassengers, setTotalPassengers] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    const fetchApi = async () => {
      const res = await axios(
        `https://api.instantwebtools.net/v1/passenger?page={pageNumber}&size=10`
      );
      setTotalPassengers(res.data.totalPassengers);
      setPosts(res.data.data);
    };
    fetchApi();
  }, []);

  const fetchData = () => {
    setPageNumber(pageNumber + 1);
    const fetchApi = async () => {
      const res = await axios(
        `https://api.instantwebtools.net/v1/passenger?page={pageNumber}&size=10`
      );
      setTotalPassengers(res.data.totalPassengers);
      setPosts(posts.concat(res.data.data));
    };
    fetchApi();
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Infinity Scroll Web Page</h1>
        <h3>Total Passengers - {totalPassengers}</h3>
        <ol>
          {posts.map((post) => {
            return (
              <li>
                Name -{post.name}
                <br />
                Id -{post._id}
                <br />
                Country - {post.airline[0].country}
                <br />
                Flight name -{post.airline[0].name}
                <br />
                <img src={post.airline[0].logo} alt="logo" />
              </li>
            );
          })}
        </ol>
        <InfiniteScroll
          dataLength={posts.length}
          next={fetchData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        ></InfiniteScroll>
      </div>
    </div>
  );
}

export default App;
