import { getArray } from "./binary.js";

async function getFileType(file){
    const array = await getArray(file, 0, 12);
    switch(array[0]){
        case 82:
            switch(array[1]){
                case 73:
                    switch(array[2]){
                        case 70:
                            switch(array[3]){
                                case 70:
                                    switch(array[8]){
                                        case 87:
                                            switch(array[9]){
                                                case 69:
                                                    switch(array[10]){
                                                        case 66:
                                                            switch(array[11]){
                                                                case 80:
                                                                    return "webP";
                                                            }
                                                    }
                                            }
                                    }
                            }
                    }
            }
        case 137:
            switch(array[1]){
                case 80:
                    switch(array[2]){
                        case 78:
                            switch(array[3]){
                                case 71:
                                    switch(array[4]){
                                        case 13:
                                            switch(array[5]){
                                                case 10:
                                                    switch(array[6]){
                                                        case 26:
                                                            switch(array[7]){
                                                                case 10:
                                                                    return "png";
                                                            }
                                                    }
                                            }
                                    }
                            }    
                    }
            }
        default: return "other";
    }
}

export { getFileType };
