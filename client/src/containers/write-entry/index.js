import React, {Component} from 'react';
import {connect} from 'react-redux';
import {submitEntryDispatcher} from '../../actions/actionCreators';

class WriteEntry extends Component {
  /*
  constructor (props) {
    super (props);
    this.state = {
      text: ''
    }
    this.handleSubmitEntry = this.handleSubmitEntry.bind(this);
  }
  handleSubmitEntry (e) {
    e.preventDefault();
    console.log('submitting: ', this.textarea.value);
    this.props.handleSubmitEntry
  }
  */
  render () {
    const {author} = this.props;
    return (
      <div>
        <h4>Entry: </h4>
        <form
          onSubmit={() => {
            console.log('this.entryTexttextarea.value: ', this.entryTexttextarea.value);
            this.props.handleSubmitEntry({
              author: author,
              text: this.entryTexttextarea.value,
              tag: []
            });
          }
          }>
          <textarea ref={t => { this.entryTexttextarea = t; }} />
          <br />
          {/* tag component with select mood options */}
          <br />
          <button type='submit'>submit</button>
        </form>
      </div>
    );
  }
}

// export default WriteEntry;

const mapStateToProps = state => ({
  author: state.userDetail.email
});

const mapDispatchToProps = dispatch => ({
  handleSubmitEntry: ({author, text, tag}) => {
    dispatch(submitEntryDispatcher({author, text, tag}));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(WriteEntry);
