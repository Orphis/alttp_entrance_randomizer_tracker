import React from 'react';
import $ from 'jquery';
import 'datatables.net-bs/css/dataTables.bootstrap.css';
import 'datatables.net';
import 'datatables.net-bs';
import 'datatables.net-buttons-bs';

export default class Table extends React.Component {
  componentDidMount() {
    $(this.table).addClass('table table-striped table-condensed table-hover');
    $(this.table).DataTable({
      dom: '<"data-table-wrapper"t>',
      data: this.props.names,
      columns: this.props.columns,
    });
  }
  componentWillUnmount() {
    $(this.table)
      .DataTable()
      .destroy(true);
  }
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <div>
        <table
          ref={(table) => {
            this.table = table;
          }}
        />
      </div>
    );
  }
}
