<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Guitar;
class GuitarController extends Controller
{
    public function getGuitar(){
return response()->json(Guitar::all(),200);
    }

    public function getGuitarById($id){
        $guitar= Guitar::find($id);
        if(is_null($guitar)){
return response()->json(['message'=>'Guitar Not Found'],404);
}
return response()->json($guitar::find($id),200);
}

public function addGuitar(Request $request){
    $guitar= Guitar::create($request->all());
    return response($guitar, 201);
}

public function updateGuitar(Request $request,$id){
    $guitar= Guitar::find($id);
    if(is_null($guitar)){
        return response()->json(['message'=>'Guitar Not Found'],404);

    }
    $guitar-> update($request->all());
    return response($guitar, 201);
    }

public function deleteGuitar(Request $request, $id){
    $guitar= Guitar::find($id);
        if(is_null($guitar)){
        return response()->json(['message'=>'Guitar Not Found'],404);

    }
$guitar-> delete();
return response()->json(null,204);
}

public function search($q){
$q.trim('');
// $results= Guitar::where('company', 'like', "%".$q."%")->where('model','like',"%".$q."%")->get();
// $results= Guitar::where('model','like',"%".$q."%")->orwhere('model','like',"%".$q."%")->get();


$results= Guitar::where(function ($query) use($q) {
        $query->where('company', 'like', '%' . $q . '%')
           ->orWhere('model', 'like', '%' . $q . '%')
           ->orWhere('year', 'like', '%' . $q . '%')
           ->orWhere('price', 'like', '%' . $q . '%');
      })
->get();


return response()->json($results,200);

}
}
