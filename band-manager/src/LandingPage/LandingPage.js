import React, { Component } from 'react';
import './LandingPage.css';
import {Container, Row, Col, Carousel, CarouselItem, CarouselControl, CarouselCaption, CarouselIndicators} from 'reactstrap';

const items = [
    {
        src: require("../Content/EliseandthePolice.jpg"),
        altText: 'Slide 1 missing',
        captionHeader: 'Welcome to Band Manager',
        caption: 'The site that gives you and your band everything you need to stay organized'
    },
    {
        src: require("../Content/EliseandthePolice2.jpg"),
        altText: 'Slide 2 missing',
        captionHeader: 'Upload media and play it back whenever you want',
        caption: 'Handles .mp3 and a few other file types'
    },
    {
        src: require("../Content/drum-photo.jpg"),
        altText: 'Slide 3 Missing',
        captionHeader: 'Upcoming Features',
        caption: 'Band Calendar, Stem Playback, File Management, Email Practice Reminders'
    }
]

class LandingPage extends Component {
  constructor(props){
    super(props);

    this.state = {
        activeIndex: 0
    }

    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting(){
      this.animating = true;
  }

  onExited(){
      this.animating = false;
  }

  next() {
      if (this.animating) {
          return;
      }
      const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
      this.setState({
          activeIndex: nextIndex
      })
  }

  previous() {
      if(this.animating){
          return;
      }

      const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
      this.setState({
          activeIndex: nextIndex
      })
  }

  goToIndex(newIndex){
      if(this.animating){
          return;
      }

      this.setState({
          activeIndex: newIndex
      })
  }

  render() {
    const {activeIndex} = this.state;

    const slides = items.map(item => {
        return (
            <CarouselItem
                onExiting={this.onExiting}
                onExited={this.onExited}
                key={item.src}>
                <img src={item.src} alt={item.altText} />
                <CarouselCaption captionText={item.caption} captionHeader={item.captionHeader} />    
            </CarouselItem>
        )
    })
    return (
      <div className="LandingPage">
        <div className="CarouselContainer">
            <Carousel
                activeIndex={activeIndex}
                next={this.next}
                previous={this.previous}>
                <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                {slides}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />    
            </Carousel>
        </div>
        <div className="InfoContainer">
                <Row>
                    <Col className="InfoBlock">
                        Item 1
                    </Col>
                    <Col className="InfoBlock">
                        Item 2
                    </Col>
                    <Col className="InfoBlock">
                        Item 3
                    </Col>
                </Row>
        </div>
      </div>
    );
  }
}

export default LandingPage;