import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams, Link } from 'react-router-dom';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { getOpinion } from '../actions/opinions';
import { getComments } from '../actions/comments';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Comments = () => {

    const { session, darkTheme, opinion } = useSelector(state => ({
        session: state.UserReducer.session,
        darkTheme: state.UserReducer.darkTheme,
        opinion: state.OpinionReducer.opinion       
    }));
    
    const history = useHistory();    

    const { opinionId } = useParams();

    const dispatch = useDispatch();

    const handleAddFavorite = () => {
        if (!session) window.location = `/signin`;        
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (!opinion) {
            dispatch(getOpinion(opinionId));            
        } else {
            history.replace(`/comments/${opinion._id}/${opinion.title}`, undefined);
        }                
    }, [dispatch, opinion, opinionId, history]);

    return (
        <Fragment>
            <Header />
            <Container className="comments">                
                {
                    opinion &&
                    <Row className={`${darkTheme ? 'dark' : 'light'} opinions-grid`}>
                        <Col xs={12} className="opinion-box">
                            <Row>
                                <Col xs={12} className="details">
                                    <span className="name">
                                        Opinion by <Link 
                                            to="/signup" 
                                            onClick={e => e.stopPropagation()}>
                                                {opinion.author.name}
                                                <img 
                                                    src={opinion.author.profilePicUrl}                                                    
                                                    alt={opinion.author.name}
                                                    className="profile-pic"
                                                /> 
                                        </Link>
                                    </span>                                                    
                                    <span className="date">
                                        on {opinion.createdAt}
                                    </span>
                                </Col>
                                <Col xs={12} className="title">
                                    {opinion.title}
                                </Col>
                                {
                                    opinion.opinionImageUrl &&
                                    <Col xs={12}>
                                        <img 
                                            src={opinion.opinionImageUrl}
                                            alt={opinion.title}
                                            className="opinion-img"
                                        />
                                    </Col>
                                }                                                
                                <Col xs={12} className="body">
                                    {opinion.body}
                                </Col>
                                <Col xs={12} className="options">
                                    <Button 
                                        className="favorite"
                                        onClick={handleAddFavorite}>
                                        <i className="fas fa-star"></i>
                                    </Button>
                                    <Button className="comment">
                                        <i className="fas fa-comments"></i>
                                    </Button>
                                </Col>                                            
                            </Row>
                        </Col>                           
                    </Row>
                }                
            </Container>
            <Footer />
        </Fragment>
    )
};

export default Comments;