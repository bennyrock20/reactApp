import React from 'react';
import { Card, CardImg,
    CardTitle, CardText,Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';


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
            <div className="col-sm-12 col-md-12">
                <Card key={dish.id}>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <div className="col-12 p-2">
                        <CardTitle><RenderName name={dish.name} /></CardTitle>
                        <CardText> {dish.description} </CardText>
                    </div>
                </Card>
            </div>
        );
      }
  
      function RenderComments({comments}) {
        if(!comments){
            return <div></div>;
        }
       
        if (comments != null ){
            return  comments.map((comments) => {
                return ( 
                        <li key={comments.id} className="media p-1">
                            <div className="media-body">
                                { comments.comment }
                                <p className="mt-0 mt-2">-- {comments.author }, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comments.date)))}</p>
                            </div>
                        </li>
                );
            });
        }
      }
  
      const  DishDetail = (props) => {
        if(!props.dish){
            return <div></div>;
        }

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
                        <RenderComments comments={props.comments} />
                        <CommentForm />
                    </div>
                </div>
            </div>
        );
      }

export default DishDetail;