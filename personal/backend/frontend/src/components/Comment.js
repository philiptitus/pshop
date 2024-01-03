// Comment.js

import React from 'react';
import Rating from './Rating';
import "../css/Comment.css"

const Comment = ({ review, level = 1 }) => (
  <div className="comments">
    <a className="photo">
      <img src="https://placehold.it/32x32" alt={review.name} />
    </a>
    <div className="meta">{`${review.name} | ${review.createdAt.substring(0, 10)} `}
    </div>
    <div className="bod">{review.comment} | <div style={{
      color:'red'
    }}><Rating value={review.rating} /></div></div>
  </div>
);

export default Comment;


// const CommentsList = () => (
//   <ul className="comments">
//     <Comment name="Kasper" date="2012.07.24 14:58" body="Cupcake ipsum dolor sit amet. Icing donut cheesecake muffin marzipan chocolate biscuit." />
//     <Comment name="John" date="2012.07.24 15:21" body="Candy soufflé bear claw apple pie bear claw marshmallow. Jelly brownie wafer chocolate jelly.marzipan pastry sesame snaps apple pie." level={2} />
//     <Comment name="Jane" date="2012.07.24 15:32" body="Tart apple pie bonbon applicake sesame snaps sugar plum." />
//     <Comment name="Jane" date="2012.07.24 15:32" body="Tart apple pie bonbon applicake sesame snaps sugar plum."  />
//     <Comment name="Kasper" date="2012.07.24 14:58" body="Cupcake ipsum dolor sit amet. Icing donut cheesecake muffin marzipan chocolate biscuit."  />
//   </ul>
// );

// export default CommentsList;

