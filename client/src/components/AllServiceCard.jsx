import Card from 'react-bootstrap/Card';

export default function AllServiceCard(props) {
    return (
        <div style={{ marginBottom: '20px' }}>
            <Card style={{ backgroundColor: 'beige', color: 'black' }}>
                <div style={{ overflow: 'hidden', width: '100%', height: '280px' }}>
                    <Card.Img src={props.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <Card.Body>
                    <Card.Title style={{ fontSize: '2rem' }}>{props.title}</Card.Title>
                    <Card.Text style={{ fontSize: '1.2rem' }}>{props.text}</Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}
