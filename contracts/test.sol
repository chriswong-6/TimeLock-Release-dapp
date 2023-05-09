// SPDX-License-Identifier: SimPL-2.0
pragma solidity >=0.8.0 <0.9.0;

contract Call{
    address public owner;
    string[] private AesList;

    address[] public HolderList;
    string key;
	address public CreatorAddress = address(this);
    //bytes32 public _Encryptmessage;
    //bytes public _sign;
    uint256 public Holderthre;
    uint256[] public OwnerList;
    address public AssembleAddress;

    //event ListenAes(uint256 indexed value);

    constructor() {
      owner = msg.sender; 
    }

    modifier onlyOwner {
      require(msg.sender == owner); 
      _; 
    }

    //分别获取每个mailman的key并push到AesList里
    function GetAesKey(string memory Key) public{
        AesList.push(Key);
    }
    //get Aes List
    function GetAesList() external view onlyOwner returns(string[] memory){
        //emit ListenAes(_value);
        return(AesList); // 
    
   }

    mapping(uint256 => uint256) public HoldermapFrag;
    //map Holder index to Fragment index
    function MapValue(uint256 Holder, uint256 Frag) public {
        HoldermapFrag[Holder] = Frag;
    }

    function GetMapValue(uint256 Holder) public view returns(uint256){
        return HoldermapFrag[Holder];
    }
    function ClearAssembleFrag(address _address) public{
        Assemble(_address).resetArrays();
    }
    function ClearHolderFrag(address _address) public{
        Other(_address).delete_key();
    }
    //改监听为上链发送holderthre和OwnerList
    function GetValue(uint256 holderthre, uint256[] memory ownerList) public{
        Holderthre = holderthre;
        OwnerList = ownerList;
        
    }
    //trans
    function SendValue() external view returns(uint, uint[] memory){
        return(Holderthre,OwnerList);
    }
    //calculate hash
    // function getMessageHash(string memory message) pure public returns(bytes32){
    //     bytes32 MessageHash = keccak256(abi.encodePacked(message));
    //     return MessageHash;
	// }
    //sign MessageHash and send to Assembler
    function SendSignatureToVerifier(bytes32 HashMessage, bytes memory sign) external payable{
        Assemble(AssembleAddress).getSignaturefromCreator(HashMessage, sign);
    }
//give Creator address to assembler
    // function GiveAddToAss() external view returns(address creatorAddress){
    //     //Assemble(_Address).GetCreatorAdd(CreatorAddress);
    //     creatorAddress = CreatorAddress;
    // }

	// function getMessageHash(string memory message) public pure returns(bytes32){
    //     return keccak256(abi.encodePacked(message));
	// }

    // function getvalue() view public returns(bytes32, bytes memory){
    //     return(_Encryptmessage,_sign);
    // }

//get message hash and decrypted to plaintext。
    // function getSignaturefromAss(bytes32 MessageHash, bytes memory sign) external payable{
    //     _Encryptmessage = MessageHash;
    //     _sign = sign;
    // }
    
    function callSetX(address _Address, string memory secret, uint timeLimit) external payable{
        Other(_Address).setX(secret, timeLimit);
    }
    function getList() public view returns(address[] memory){
		return(HolderList);
	}
    function GetHolderList(address _Address) public returns(address[] memory){
		HolderList.push(_Address);
		return(HolderList);
	}
    function GetAssemblerAddress(address _Address) public{
        AssembleAddress = _Address;
    }
}
contract Other{
    string public _secret; 
    uint lockTime;
    event Log(uint amount, uint gas);
    


    //give AesKey to sender
    function SendAesKey(address _address, string memory Key) public{
        Call(_address).GetAesKey(Key);
    }


    function SendAddress(address _address) public {
		Call(_address).GetHolderList(address(this));
		//address add = address(this);
	}

    function setX(string memory secret,uint timeLimit) external payable{
        _secret = secret;
        lockTime = block.timestamp + timeLimit;
    }
    function delete_key() public{
        delete _secret;
    }
    function lock(address _Address) public{

        if(block.timestamp >= lockTime){
            if (bytes(_secret).length != 0){
                Assemble(_Address).check(_secret);
            }
        }
    }
}
contract Assemble{
    string[] public combination;
    address public owner = msg.sender;
    bytes public sign;
    bytes32 public HashMessage;
    //address CreatorAddress;
    //uint256 Holderthre;
    //uint256 OwnerList;
    //用ownerlist获取index 用index调用映射获取fragment（未完成）
    function callGetX(Call _Address, uint256 OwnerIndex) external view returns(uint256 res){
        res = _Address.GetMapValue(OwnerIndex);
    }

    function SendAddress(address _address) public {
		Call(_address).GetAssemblerAddress(address(this));
		//address add = address(this);
	}
    //get Holderthre,OwnerList
    function GetValue(Call _Address)external view returns(uint256 , uint256[] memory){
        (uint256 Holderthre,uint256[] memory OwnerList) = _Address.SendValue();
        return(Holderthre,OwnerList);
    }


    function resetArrays() public {

        delete combination; // ）
    }

    function check(string memory reveal) external payable{
        string memory _reveal;

        if (keccak256(bytes(reveal)) != keccak256(bytes('Not_satisfy'))){
            _reveal = reveal;
            combination.push(_reveal);
        }


    }
    function check1() public view returns(string[] memory){
        return combination;
    }

    function getSignaturefromCreator(bytes32 _HashMessage, bytes memory _sign) public{
        sign = _sign;
        HashMessage = _HashMessage;
    }

}
