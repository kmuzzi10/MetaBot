
import Card from 'react-bootstrap/Card';

export default function ProjectCards(props) {
    


    return (
        <div style={{ marginBottom: '20px' }}> {/* Add margin bottom for spacing between cards */}
            <Card style={{ backgroundColor: 'beige', color: 'black' }}>
                <Card.Img variant="top" src={props.image} style={{ width: '300px', height: '280px' }} />
                <Card.Body>
                    <Card.Text style={{ fontSize: '2rem' }}>
                       {props.title}
                    </Card.Text>
                    <Card.Text style={{ fontSize: '1.2rem' }}>
                       {props.text}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}


