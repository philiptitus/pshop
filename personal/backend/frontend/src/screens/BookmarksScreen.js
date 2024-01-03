import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Table, Image } from 'react-bootstrap';
import { deleteBookmark, listMyBookmarks } from '../actions/productActions';
import LoadingSpinner from '../components/LoadingSpinner';

import Message from '../components/Message';

function BookmarksScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bookmarkDelete = useSelector((state) => state.bookmarkDelete);
  const { success: successDelete } = bookmarkDelete;

  const deleteHandler = (id) => {
    dispatch(deleteBookmark(id));
  };

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const bookmarkListMy = useSelector((state) => state.bookmarkListMy);
  const { loading: loadingBookmarks, error: errorBookmarks, bookmarks } = bookmarkListMy;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      dispatch(listMyBookmarks());
    }
  }, [dispatch, navigate, userInfo, user, successDelete]);

  return (
    bookmarks && bookmarks.length === 0 ? (

      <Message variant='primary'>
        You Have No Favourites Yet <Link to='/'> Get Back To Shopping </Link>
      </Message>
    ):
    <Row>
      <Col sm={12} md={10} lg={10}>
        <h2>My Favourites</h2>
        {loadingBookmarks ? (
         <LoadingSpinner />
        ) : errorBookmarks ? (
          <Message variant='danger'>{errorBookmarks}</Message>
        ) : (
          <Table striped responsive className='container-fluid'>
            <thead>
              <tr>
              </tr>
            </thead>
            


<tbody>
  {bookmarks.map((bookmark, index) => (
    <tr key={bookmark._id} style={{ width:"100%" }}>
      <td>{index + 1}</td>
      <td>
        <Link to={`/product/${bookmark.bookmarked_product_id}`}>
          {bookmark.bookmarked_product_name}
        </Link>
      </td>
      <td>

        <Image


        src={bookmark.bookmarked_product_image}
                        alt={bookmark.bookmarked_product_name}
                        style={{
                          width: '70px',
                          height: 'auto',
                        }}
                        fluid
                        rounded
        
        
        
        
        />

      </td>
      <td className="text-right">
        <Button
          variant="warning"
          className="btn-sm"
          onClick={() => deleteHandler(bookmark._id)}
        >
          <i className="fas fa-times"></i>
        </Button>
      </td>
    </tr>
  ))}
</tbody>





          </Table>
        )}
      </Col>
    </Row>
  );
}

export default BookmarksScreen;
