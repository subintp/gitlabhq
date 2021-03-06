class ListIssue {
  constructor (obj) {
    this.id = obj.iid;
    this.title = obj.title;
    this.confidential = obj.confidential;
    this.labels = [];

    if (obj.assignee) {
      this.assignee = new ListUser(obj.assignee);
    }

    obj.labels.forEach((label) => {
      this.labels.push(new ListLabel(label));
    });

    this.priority = this.labels.reduce((max, label) => {
      return (label.priority < max) ? label.priority : max;
    }, Infinity);
  }

  addLabel (label) {
    if (!this.findLabel(label)) {
      this.labels.push(new ListLabel(label));
    }
  }

  findLabel (findLabel) {
    return this.labels.filter( label => label.title === findLabel.title )[0];
  }

  removeLabel (removeLabel) {
    if (removeLabel) {
      this.labels = this.labels.filter( label => removeLabel.title !== label.title );
    }
  }

  removeLabels (labels) {
    labels.forEach(this.removeLabel.bind(this));
  }

  getLists () {
    return gl.issueBoards.BoardsStore.state.lists.filter( list => list.findIssue(this.id) );
  }
}
