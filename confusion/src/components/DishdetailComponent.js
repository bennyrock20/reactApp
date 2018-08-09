import React from 'react';
import { Card, CardImg,
    CardTitle, CardText } from 'reactstrap';


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
            <div className="col-sm-12 col-md-5 m-1">
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
            <div className="row">
               <RenderDish dish= {props.dish} />
                <div className="col-xs-12 col-md-5 m-1">
                    <h4> Comments</h4>;
                    <ul className="list-unstyled" onClick={()=> props.onClick("hi william","Tapia")}>
                        <RenderComments comments= {props.dish.comments} />
                    </ul>
                </div>
            </div>
        );
      }

export default DishDetail;