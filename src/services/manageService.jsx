import useAxiosPrivate from '../../hooks/useAxiosPrivate'

const useAxios = useAxiosPrivate()

const getAllContent = () => {
  return useAxios.get('roles/showallcontent')
}

const deleteContent = (id) => {
  return useAxios.delete(`roles/delete/${id}`)
}

const deleteContents = (ids) => {
  return useAxios.delete('crud/delete/many', { ids })
}

const getAllUser = () => {
  return useAxios.get(`roles/admin/showalluser`)
}

const deleteUser = (userId) => {
  return useAxios.delete(`roles/admin/delete/${userId}`)
}

const ManageService = {
  getAllContent,
  getAllUser,
  deleteUser,
  deleteContent,
  deleteContents,
}

export default ManageService
