import React from 'react';
import {Container} from 'reactstrap';
import {connect} from 'react-redux';
import NavBar from '../NavBarClient';
import Footer from '../Footer';
import ModalCreate from './ModalCreate';
import ModalDelete from './ModalDelete';
import ModalUpdate from './ModalUpdate';
import Pagination from '../Pagination';
import ItemTable from './ItemTable';
import adminAction from '../../redux/actions/admin';

class AdminItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpenNew: false,
      modalOpenUpdate: false,
      modalOpenDelete: false,
      delUrl: '',
      pageInfo: {
        count: null,
        pages: null,
        limitPerPage: 5,
        currentPage: 1,
        nextLink: '',
        prefLink: '',
      },
      allCategories: [],
      selectedItemId: 0,
      deleteName: '',
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.getItemDetailsPending !== this.props.getItemDetailsPending) {
      if (prevProps.admin.getItemDetailsSucces) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          modalOpenUpdate: true,
        });
      }
    }
  }

  openModalUpdate = (id) => {
    this.setState({
      selectedItemId: id,
    });
  };

  openModalDelete = (id, deleteName) => {
    this.setState({
      modalOpenDelete: true,
      selectedItemId: id,
      deleteName,
    });
  };

  closeModal = async (n) => {
    if (n === 'del') {
      this.setState({
        modalOpenDelete: false,
      });
    } else if (n === 'crt') {
      this.setState({
        modalOpenNew: false,
      });
    } else if (n === 'updt') {
      this.setState({
        modalOpenUpdate: false,
      });
    }
  };

  render() {
    console.log('render parent');
    const {
      deleteName,
      delUrl,
      pageInfo,
      allCategories,
      selectedItemId,
    } = this.state;
    console.log(pageInfo);
    return (
      <>
        <NavBar />
        <Container className="my-3">
          <h1 className="my-3">Items on Tuku</h1>
          <ItemTable
            openNew={() => this.setState({modalOpenNew: true})}
            openDetail={(id) => this.openModalUpdate(id)}
            openDelete={(id, delname) =>
              this.openModalDetailDelete(id, delname)
            }
          />
          <Pagination adminPage />
        </Container>
        <Footer />
        <ModalCreate
          modalOpenNew={this.state.modalOpenNew}
          categories={allCategories}
          modalCloseNew={async (n) => this.closeModal(n)}
        />
        <ModalUpdate
          modalOpenUpdate={this.state.modalOpenUpdate}
          item_id={selectedItemId}
          modalCloseUpdate={async (n) => this.closeModal(n)}
        />
        <ModalDelete
          modalOpenDelete={this.state.modalOpenDelete}
          url={delUrl}
          deleteName={deleteName}
          item_id={selectedItemId}
          modalCloseDelete={async (n) => this.closeModal(n)}
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
