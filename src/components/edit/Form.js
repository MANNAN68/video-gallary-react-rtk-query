import { useParams } from "react-router-dom";
import { useEditVideoMutation } from "../../features/api/apiSlice";
import TextArea from "../ui/TextArea";
import TextInput from "../ui/TextInput";
import Success from "../ui/Success";
import Error from "../ui/Error";

export default function Form() {

    const {id}=useParams();

    const [editVideo,{data:video, isLoading,isSuccess,isError}]=useEditVideoMutation()

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const formData=new FormData(e.target);
        const data=Object.fromEntries(formData);
        await editVideo({id,data});
    }

    return (
        <form  method="POST" onSubmit={handleSubmit}>
            <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                            <TextInput title="Video Title" name="title" defaultValue={video?.title || ""}  />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <TextInput title="Author" name="author" />
                        </div>

                        <div className="col-span-6">
                            <TextArea title="Description"  name="description" />
                        </div>

                        <div className="col-span-6">
                            <TextInput title="YouTube Video link" name="link" />
                        </div>

                        <div className="col-span-6">
                            <TextInput title="Thumbnail link"  name="thumbnail" />
                        </div>

                        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                            <TextInput title="Upload Date" name="date" />
                        </div>

                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                            <TextInput title="Video Duration" name="duration" />
                        </div>

                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                            <TextInput title="Video no of views" name="views" />
                        </div>
                    </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button disabled={isLoading}
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-500"
                    >
                        Save
                    </button>
                </div>
                {isSuccess && (
                    <Success message="Video was editing successfully" />
                )}
                {isError && (
                    <Error message="There was an error editing video!" />
                )}
            </div>
        </form>
    );
}
