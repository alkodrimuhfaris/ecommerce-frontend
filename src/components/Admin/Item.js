import React from 'react';
import {Container} from 'reactstrap';
import {connect} from 'react-redux';
import NavBar from '../NavBarClient';
import Footer from '../Footer';
import ModalCreate from './ModalCreate';
import Pagination from '../Pagination';
import ItemTable from './ItemTable';
import adminAction from '../../redux/actions/admin';

class AdminItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpenNew: false,
      pageInfo: {
        count: null,
        pages: null,
        limitPerPage: 5,
        currentPage: 1,
        nextLink: '',
        prefLink: '',
      },
      allCategories: [],
    };
  }

  closeModal = async (n) => {
    if (n === 'crt') {
      this.setState({
        modalOpenNew: false,
      });
    }
  };

  render() {
    console.log('render parent');
    const {pageInfo, allCategories} = this.state;
    console.log(pageInfo);
    return (
      <>
        <NavBar />
        <Container className="my-3">
          <h1 className="my-3">Items on Tuku</h1>
          <ItemTable
            openNew={() => this.setState({modalOpenNew: true})}
            openDetail={(id) => this.openModalUpdate(id)}
          />
          <Pagination adminPage />
        </Container>
        <Footer />
        <ModalCreate
          modalOpenNew={this.state.modalOpenNew}
          categories={allCategories}
          modalCloseNew={async (n) => this.closeModal(n)}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  admin: state.admin,
  getItemDetailsPending: state.admin.getItemDetailsPending,
  query: state.admin.query,
});

const mapDispatchToProps = {
  getAllItems: adminAction.getAdminItems,
  getThisItem: adminAction.getItemDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminItem);
