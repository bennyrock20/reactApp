import React from 'react';
import { Card, CardImg,
    CardTitle, CardText } from 'reactstrap';


class DishDetail extends React.Component{

    
    renderDish(dish){
        if(!dish){
            return <div></div>;
        }
        
        return (
        <div className="col-sm-12 col-md-5 m-1">
            <Card key={dish.id}>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <div className="col-12 p-2">
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText> {dish.description} </CardText>
                </div>
            </Card>
        </div>
        );
    }
    renderComments(dish){
        if(!dish){
            return <div></div>;
        }
        var comments = dish.comments;
        if (comments != null ){
            return  comments.map((comment) => {
                return ( 
                        <li key={comment.id} className="media p-1">
                            <div className="media-body">
                                { comment.comment }
                                <p className="mt-0 mt-2">-- {comment.author }, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                            </div>
                        </li>
                );
            });
        }
    }

    render(){
        return (
                <div className="row">
                   {this.renderDish(this.props.dish)}
                    <div className="col-xs-12 col-md-5 m-1">
                        <h4> Comments</h4>;
                        <ul className="list-unstyled" onClick={()=> this.props.onClick("hi william","Tapia")}>
                            {this.renderComments(this.props.dish)}
                        </ul>
                    </div>
                </div>
            );
    }
}
export default DishDetail;