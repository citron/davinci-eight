import Simplex = require('../geometries/Simplex');
import Symbolic = require('../core/Symbolic');
import MutableNumber = require('../math/MutableNumber');
import MutableVectorE2 = require('../math/MutableVectorE2');
import MutableVectorE3 = require('../math/MutableVectorE3');
import MutableVectorE4 = require('../math/MutableVectorE4');

function buildPlane(
  u: string,
  v: string,
  udir: number,
  vdir: number,
  width: number,
  height: number,
  depth: number,
  widthSegments: number,
  heightSegments: number,
  depthSegments: number,
  geometryIndex: MutableNumber,
  points: MutableVectorE3[],
  faces: Simplex[]) {

  var w: string;
  var ix: number;
  var iy: number;
  let gridX = widthSegments;
  let gridY = heightSegments;
  
  let width_half = width / 2;
  let height_half = height / 2;

  let offset = points.length;

  if ( ( u === 'x' && v === 'y' ) || ( u === 'y' && v === 'x' ) ) {
    w = 'z';
  }
  else if ( ( u === 'x' && v === 'z' ) || ( u === 'z' && v === 'x' ) ) {
    w = 'y';
    gridY = depthSegments;
  }
  else if ( ( u === 'z' && v === 'y' ) || ( u === 'y' && v === 'z' ) ) {
    w = 'x';
    gridX = depthSegments;
  }

  let gridX1 = gridX + 1;
  let gridY1 = gridY + 1;
  let segment_width = width / gridX;
  let segment_height = height / gridY;

  // The normal starts out as all zeros.
  let normal = new MutableVectorE3();
  // A bit of hackery to keey TypeScript compiler happy.
  // TODO: This should really be implemented by, say, cyclic permutation of an array.
  var something: any = normal;
  let bogusNormal: { [key: string]: number } = something;
  // This bit of code sets the appropriate coordinate in the normal vector.
  bogusNormal[ w ] = depth > 0 ? 1 : - 1;

  // Compute the points.
  for ( iy = 0; iy < gridY1; iy ++ ) {
    for ( ix = 0; ix < gridX1; ix ++ ) {
      let point = new MutableVectorE3();
      something = point;
      let bogusPoint: { [key: string]: number } = something;

      // This bit of code sets the appropriate coordinate in the position vector.
      bogusPoint[ u ] = ( ix * segment_width - width_half ) * udir;
      bogusPoint[ v ] = ( iy * segment_height - height_half ) * vdir;
      bogusPoint[ w ] = depth;

      points.push(point);
    }
  }

  // Compute the triangular faces using the pre-computed points.
  for ( iy = 0; iy < gridY; iy ++ ) {
    for ( ix = 0; ix < gridX; ix ++ ) {

      var a = ix + gridX1 * iy;
      var b = ix + gridX1 * ( iy + 1 );
      var c = ( ix + 1 ) + gridX1 * ( iy + 1 );
      var d = ( ix + 1 ) + gridX1 * iy;

      var uva = new MutableVectorE2([ix / gridX, 1 - iy / gridY]);
      var uvb = new MutableVectorE2([ix / gridX, 1 - ( iy + 1 ) / gridY]);
      var uvc = new MutableVectorE2([( ix + 1 ) / gridX, 1 - ( iy + 1 ) / gridY]);
      var uvd = new MutableVectorE2([( ix + 1 ) / gridX, 1 - iy / gridY]);

      var face = new Simplex(Simplex.TRIANGLE);
      
      face.vertices[0].attributes[Symbolic.ATTRIBUTE_POSITION] = points[a + offset];
      face.vertices[0].attributes[Symbolic.ATTRIBUTE_NORMAL] = normal;
      face.vertices[0].attributes[Symbolic.ATTRIBUTE_TEXTURE_COORDS] = uva;
      face.vertices[0].attributes[Symbolic.ATTRIBUTE_GEOMETRY_INDEX] = geometryIndex;

      face.vertices[1].attributes[Symbolic.ATTRIBUTE_POSITION] = points[b + offset];
      face.vertices[1].attributes[Symbolic.ATTRIBUTE_NORMAL] = normal;
      face.vertices[1].attributes[Symbolic.ATTRIBUTE_TEXTURE_COORDS] = uvb;
      face.vertices[1].attributes[Symbolic.ATTRIBUTE_GEOMETRY_INDEX] = geometryIndex;

      face.vertices[2].attributes[Symbolic.ATTRIBUTE_POSITION] = points[d + offset];
      face.vertices[2].attributes[Symbolic.ATTRIBUTE_NORMAL] = normal;
      face.vertices[2].attributes[Symbolic.ATTRIBUTE_TEXTURE_COORDS] = uvd;
      face.vertices[2].attributes[Symbolic.ATTRIBUTE_GEOMETRY_INDEX] = geometryIndex;

      faces.push( face );

      face = new Simplex(Simplex.TRIANGLE);

      face.vertices[0].attributes[Symbolic.ATTRIBUTE_POSITION] = points[b + offset];
      face.vertices[0].attributes[Symbolic.ATTRIBUTE_NORMAL] = normal;
      face.vertices[0].attributes[Symbolic.ATTRIBUTE_TEXTURE_COORDS] = uvb;
      face.vertices[0].attributes[Symbolic.ATTRIBUTE_GEOMETRY_INDEX] = geometryIndex;

      face.vertices[1].attributes[Symbolic.ATTRIBUTE_POSITION] = points[c + offset];
      face.vertices[1].attributes[Symbolic.ATTRIBUTE_NORMAL] = normal;
      face.vertices[1].attributes[Symbolic.ATTRIBUTE_TEXTURE_COORDS] = uvc;
      face.vertices[1].attributes[Symbolic.ATTRIBUTE_GEOMETRY_INDEX] = geometryIndex;

      face.vertices[2].attributes[Symbolic.ATTRIBUTE_POSITION] = points[d + offset];
      face.vertices[2].attributes[Symbolic.ATTRIBUTE_NORMAL] = normal;
      face.vertices[2].attributes[Symbolic.ATTRIBUTE_TEXTURE_COORDS] = uvd;
      face.vertices[2].attributes[Symbolic.ATTRIBUTE_GEOMETRY_INDEX] = geometryIndex;

      faces.push( face );
    }
  }
}

export = buildPlane;
