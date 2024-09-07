import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosInstance from './PageElements/axiosInstance';
import { Box, Card, CardContent, Typography, Grid, Button, Rating, TextField, Alert } from '@mui/material';

function BeerDetails() {
  const [beer, setBeer] = useState(null); // Estado para manejar la cerveza
  const [rating, setRating] = useState(0); // Estado para manejar el rating
  const [comment, setComment] = useState(''); // Estado para manejar el comentario
  const [error, setError] = useState(''); // Estado para manejar los mensajes de error
  const [success, setSuccess] = useState(''); // Estado para manejar el mensaje de éxito
  const [reviews, setReviews] = useState([]); // Estado para manejar las reseñas de otros usuarios
  const [users, setUsers] = useState(null); // Estado para manejar los usuarios
  const { id } = useParams();
  const storedUser = localStorage.getItem('currentUser');
  const currentUser = storedUser ? JSON.parse(storedUser) : null;
  const [loadUser, setLoadUser] = useState(false);

  // Fetch beer details
  useEffect(() => {
    axiosInstance.get(`/beers/${id}`)
      .then((res) => {
        setBeer(res.data.beer);
        setRating(res.data.beer.avg_rating || 0); // Establecer rating inicial si existe
      })
      .catch((error) => {
        console.error('Error fetching beer:', error);
      });
  }, [id]);

  // Fetch reviews
  useEffect(() => {
    axiosInstance.get(`/reviews`)
      .then((res) => {
        setReviews(res.data.reviews);
      })
      .catch((error) => {
        console.error('Error fetching reviews:', error);
      });
  }, [id]);

  // Fetch users
  useEffect(() => {
    axiosInstance.get('/users')
      .then(response => {
        setUsers(response.data.users); // Ensure users is set as an array
        setLoadUser(true);
      })
      .catch(error => {
        console.error('There was an error fetching the users!', error);
      });
  }, []);

  const handleRatingChange = (event, newRating) => {
    setRating(newRating);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    // Validate the comment and rating
    const wordCount = comment.trim().split(/\s+/).length;
    
    if (wordCount < 15) {
      setError('The comment must be at least 15 words.');
      return;
    }

    if (!rating || rating < 1 || rating > 5) {
      setError('The rating must be between 1 and 5.');
      return;
    }

    setError('');
    
    axiosInstance.post(`/users/${currentUser.id}/reviews`, {
      beer_id: id,
      rating: rating,
      text: comment
    })
      .then(() => {
        setSuccess('Review submitted successfully!');
        setRating(0);
        setComment('');
      })
      .catch((error) => {
        setError('Error submitting the review. Please try again.');
        console.error('Error submitting review:', error);
      });
  };

  return (
    <>
      {beer ? (
        <Box key={beer.id} sx={{ width: '100%', maxWidth: '600px', margin: '0 auto', padding: '70px' }}>
          {/* Beer description */}
          <Card sx={{ backgroundColor: '#f5c000' }}>
            <CardContent>
              <Typography variant="h4" component="div" sx={{ color: '#000' }}>
                {beer.name}
              </Typography>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12}>
                  <Typography variant="body1" sx={{ color: '#000' }}>
                    <strong>Style:</strong> {beer.style || 'Unknown'}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" sx={{ color: '#000' }}>
                    <strong>Hop:</strong> {beer.hop || 'Unknown'}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" sx={{ color: '#000' }}>
                    <strong>Yeast:</strong> {beer.yeast || 'Unknown'}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" sx={{ color: '#000' }}>
                    <strong>Malts:</strong> {beer.malts || 'Unknown'}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" sx={{ color: '#000' }}>
                    <strong>ABV:</strong> {beer.abv || 'Unknown'}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" sx={{ color: '#000' }}>
                    <strong>IBU:</strong> {beer.ibu || 'Unknown'}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" sx={{ color: '#000' }}>
                    <strong>Alcohol:</strong> {beer.alcohol || 'Unknown'}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" sx={{ color: '#000' }}>
                    <strong>Blg:</strong> {beer.blg || 'Unknown'}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" sx={{ color: '#000' }}>
                    <strong>Rating:</strong> {beer.avg_rating || 'Unknown'}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Link to={`/beer/${beer.id}/bars`} style={{ textDecoration: 'none' }}>
              <Button variant="contained" sx={{ backgroundColor: '#f5c000', color: '#000' }}>
                Where to Find It
              </Button>
            </Link>
          </Box>

          {/* Rating */}
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Card sx={{ backgroundColor: '#f5c000' }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#000', mb: 1 }}>
                  Rate this beer:
                </Typography>

                <Rating
                  name="beer-rating"
                  value={rating}
                  onChange={handleRatingChange}
                  size="large"
                  sx={{
                    '& .MuiRating-iconFilled': {
                      color: '#000',
                    },
                    '& .MuiRating-iconHover': {
                      color: '#000',
                    },
                  }}
                />

                <TextField
                  label="Add a comment"
                  value={comment}
                  onChange={handleCommentChange}
                  fullWidth
                  variant="outlined"
                  sx={{ mt: 2 }}
                />

                {error && (
                  <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                  </Alert>
                )}

                {success && (
                  <Alert severity="success" sx={{ mt: 2 }}>
                    {success}
                  </Alert>
                )}

                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{ backgroundColor: '#000', color: '#f5c000', mt: 2 }}
                >
                  Submit Rating and Comment
                </Button>
              </CardContent>
            </Card>
          </Box>

          {/* Reviews list */}
          <Box sx={{ mt: 5 }}>
            <Card sx={{ backgroundColor: '#f5c000', mb: 2 }}>
              <CardContent>
                <Typography variant="h5" sx={{ color: '#000', mb: 3 }}>
                  Reviews
                </Typography>

                {reviews.length > 0 ? (
                  reviews
                    .filter(review => review.beer_id === parseInt(id)) // Filter reviews by beer ID
                    .map((review) => (
                      <Box key={review.id} sx={{ backgroundColor: '#fff', mb: 2, p: 2, borderRadius: '8px', border: '1px solid #f5c000' }}>
                        <Typography variant="body1" sx={{ color: '#000' }}>
                          <strong>Rating:</strong> {review.rating}
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#000' }}>
                          <strong>Comment:</strong> {review.text}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#000' }}>
                          <strong>Posted by:</strong> {review.user_id || 'Unknown'}
                        </Typography>
                      </Box>
                    ))
                ) : (
                  <Typography variant="body2" sx={{ color: '#000' }}>
                    No reviews yet.
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Box>

        </Box>
      ) : (
        <Typography variant="h6" sx={{ color: '#fff' }}>Loading...</Typography>
      )}
    </>
  );
}

export default BeerDetails;
