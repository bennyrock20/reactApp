import React from 'react';
import { Card, CardImg,
    CardTitle, CardText,Breadcrumb, BreadcrumbItem ,Button, Modal, ModalHeader, ModalBody,Row, Col, 
        Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


class CommentForm extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isModalOpen : false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }


    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
    }


    handleSubmit(values) {
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render(){
        return (
            <div>
                <button  onClick={this.toggleModal} class="btn btn-outline-secondary" > <i class="fa fa-pencil"> </i>
                    &nbsp;  Submit Comment
                </button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <Row className="form-group">
                            <Label htmlFor="author" md={2}>First Name</Label>
                            <Col md={10}>
                                <Control.text model=".author" id="author" name="author"
                                    placeholder="Author"
                                    className="form-control"
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                    />
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />
                            </Col>
                        </Row>

                        <Row className="form-group">
                            <Label htmlFor="rating" md={2}>Rating</Label>
                            <Col md={10}>
                                <Control.select model=".rating" id="rating" name="rating"
                                    placeholder="Rating"
                                    className="form-control"
                                    validators={{
                                        required
                                    }}
                                >
                                    <option value="">Choose an option</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </Control.select>
                                <Errors
                                    className="text-danger"
                                    model=".rating"
                                    show="touched"
                                    messages={{
                                        required: 'Please insert a comment'
                                    }}
                                />
                            </Col>
                        </Row>

                        
            
         
                        <Row className="form-group">
                            <Label htmlFor="comment" md={2}>Comment</Label>
                            <Col md={10}>
                                <Control.textarea model=".comment" id="comment" name="comment"
                                    rows="12"
                                    className="form-control"
                                    validators={{
                                        required
                                    }}
                                    />
                                    <Errors
                                    className="text-danger"
                                    model=".comment"
                                    show="touched"
                                    messages={{
                                        required: 'Please choose an option'
                                    }}
                            />
                            </Col>
                         
                        </Row>
                        <Row className="form-group">
                            <Col md={{size:10, offset: 2}}>
                                <Button type="submit" color="primary">
                                Submit Comment
                                </Button>
                            </Col>
                        </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }

}


function RenderName({name}){
    return (
        <p className="display-4">{name}</p>
    );
}

function RenderDish({dish}) {
    if(!dish){
        return <div></div>;
    }
    return (
        <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
            <div className="col-sm-12 col-md-12">
                <Card key={dish.id}>
                    <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                    <div className="col-12 p-2">
                        <CardTitle><RenderName name={dish.name} /></CardTitle>
                        <CardText> {dish.description} </CardText>
                    </div>
                </Card>
            </div>
        </FadeTransform>
    );
  }

  function RenderComments({comments, postComment, dishId}) {
    if(!comments){
        return <div></div>;
    }
   
    if (comments != null ){
        
            const comm =  comments.map((comments) => {
                return (
                    <Fade in> 
                        <li key={comments.id} className="media p-1">
                            <div className="media-body">
                                { comments.comment }
                                <p className="mt-0 mt-2">-- {comments.author }, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comments.date)))}</p>
                            </div>
                        </li>
                    </Fade>
                );
            });
        

        return (
            <Stagger in>
                <div>
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {comm}
                    </ul>
                    <CommentForm dishId={dishId} postComment={postComment} />
                </div>
            </Stagger>
        );

    }
  }

const  DishDetail = (props) => {
    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-6">
                        <h2>Comments</h2>
                        <RenderComments comments={props.comments}
                            postComment={props.postComment}
                            dishId={props.dish.id}
                        />
                    </div>
                </div>
            </div>
        );
    }
  }

export default DishDetail;