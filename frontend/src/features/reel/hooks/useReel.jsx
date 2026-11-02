import { useDispatch } from 'react-redux'
import { createReel, deleteReel, fetchFeed } from '../services/reel.api'
import { setLoading, setReels } from '../slices/reel.slice'

const useReel = () => {
  const dispatch = useDispatch()
  const handleCreateReel = async formData => {
    try {
      dispatch(setLoading(true))
      const res = await createReel(formData)
      return res
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(setLoading(false))
    }
  }

  const handleDeleteReel = async () => {
    try {
      const res = await deleteReel()
      return res
    } catch (error) {
      console.log(error)
    }
  }
  const handleFetchFeed = async () => {
    try {
      const res = await fetchFeed()
      dispatch(setReels(res.reels))
      return res
    } catch (error) {
      console.log(error)
    }finally{
      dispatch(setLoading(false))
    }
  }

  return { handleCreateReel, handleDeleteReel, handleFetchFeed }
}

export default useReel
